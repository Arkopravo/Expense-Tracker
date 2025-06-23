import React from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';

const App = () => {
  return (
    <div className=''>
      <Router> 
        <Routes>
          <Route path='/' element={<Root/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/dashboard' element={<Home/>} />
          <Route path='/income' element={<Income/>} />
          <Route path='/expense' element={<Expense/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;

const Root = () => {
  // check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem("token");    // !!localStorage.getItem(...) is a common JavaScript idiom to convert a value to a boolean

  // redirect to dashboard if authenticated, otherwise to login
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  )
}