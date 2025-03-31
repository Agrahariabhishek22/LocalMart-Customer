import { useState } from 'react'
import Navbar from './components/common/Navbar'
import { Outlet } from 'react-router-dom'
import {Toaster} from "react-hot-toast"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function App() {
 
  return (
    <div>
     <Toaster position="top-right" reverseOrder={false} />
     <ToastContainer position="bottom-right" autoClose={3000} />
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default App
