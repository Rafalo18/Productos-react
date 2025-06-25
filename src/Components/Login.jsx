// src/components/Login.jsx
import { useState } from 'react';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 30,
        }),
       
      });

      if (!res.ok) throw new Error('Error al iniciar sesión');

      const data = await res.json();
      setUser(data); // guardar el usuario logueado
      alert('Inicio de sesión exitoso');
      console.log(data);
    } catch (error) {
      alert('Usuario o contraseña incorrectos');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
}

export default Login;
