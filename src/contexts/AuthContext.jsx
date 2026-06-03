import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  const login = async (userEmail, password) => {
    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, password }),
        credentials: 'include',
      };

      const res = await fetch('/api/users/logon', options);
      const data = await res.json();

      if (res.status === 200 && data.name && data.csrfToken) {
        setEmail(data.name);
        setToken(data.csrfToken);
        return { success: true };
      } else {
        return {
          success: false,
          error: `Authentication failed: ${data?.message}`,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: `Error: ${error.name} | ${error.message}`,
      };
    }
  };

  const logout = async () => {
    if (!token) {
      setEmail('');
      setToken('');
      return { success: true };
    }

    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
      };
      await fetch('/api/users/logoff', options);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: `Error: ${error.name} | ${error.message}`,
      };
    } finally {
      setEmail('');
      setToken('');
    }
  };

  const value = {
    email,
    token,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}