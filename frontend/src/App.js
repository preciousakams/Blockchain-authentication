import React, {useEffect} from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import authStore from './authStore';
import './App.css';
import RequireAuth from './components/RequireAuth';

function App() { 
const s = authStore();

  useEffect(() => {
    s.init();
    // eslint-disable-next-line
  }, []);

  if (!s.ready) {
    return <div>Loading...</div>;
  }

  return (
   
      <BrowserRouter>
      <Routes>
        <Route index element= {<RequireAuth element = {<Home />} />} />
        <Route path="/login" element= {<Login />} />
      
      </Routes>
      </BrowserRouter>

  );
}

export default App;
