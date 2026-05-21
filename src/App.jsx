import './App.css';
import { useState } from 'react';
import Header from './shared/Header';
import Logon from './features/Logon';
import TodosPage from './features/Todos/TodosPage';

function App() {
  // The underscore here lets React know email is left unused intentionally
  // I had to add it, since it kept giving me an error until then
  const [_email, setEmail] = useState('');
  const [token, setToken] = useState('');

  return (
    <>
      <Header token={token} onSetToken={setToken} onSetEmail={setEmail} />
      {token
        ? <TodosPage token={token} />
        : <Logon onSetEmail={setEmail} onSetToken={setToken} />
      }
    </>
  );
}

export default App;