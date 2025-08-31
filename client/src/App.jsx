import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Admin from "./components/admin";
import Employee from './components/emplyoee';
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/employee' element={<Employee />} />

      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}

export default App