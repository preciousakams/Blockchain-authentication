import React, { useEffect, useState } from 'react';
// import Logout from './logout';

function Home() {
  const [message, setMessage] = useState('');
  const Logout = () => {
    fetch('/api/logout')
      .then((res) => res.json())
      .then(() => {
        window.location.href = '/login';
      });
  };

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
     
  }, []);


  return (
    <div>
      <p>{message}</p>
      <button onClick={Logout}>Logout</button>
    </div>
  );
}

export default Home;
