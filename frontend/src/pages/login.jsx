import React from 'react';
import authStore from '../authStore';
import { Navigate } from 'react-router-dom';

function Login() {
  const s = authStore();

  if (s.loggedIn) return <Navigate to="/" />;

  return (
    <div>
      {s.address === "" ? ( 
        <>
        <button onClick={s.connectWallet}>Connect wallet</button>
        </>
      ) : ( 
        <>
        <button onClick={s.signin}>Login</button>
        </>
      )}
    </div>
  );
}

export default Login;
