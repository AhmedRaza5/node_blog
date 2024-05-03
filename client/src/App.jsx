import React, { useEffect, useState } from 'react'
import Signup from './pages/Signup'
import './App.css'
import { Router_App } from './config/Router_App'
import { useDispatch, useSelector } from 'react-redux'
import axios_instance from './config/axios'
import { set_user_auth_and_data } from './store/slices/user_data_slice'


const App = () => {
 


  return (
   <Router_App />
  )
}

export default App
