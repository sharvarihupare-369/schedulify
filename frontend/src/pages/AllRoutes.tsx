import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Signup from './Signup';

const AllRoutes = () => {
  return (
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
  )
}

export default AllRoutes