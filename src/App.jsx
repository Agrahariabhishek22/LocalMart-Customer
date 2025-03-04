import { useState } from 'react'
import Navbar from './components/common/Navbar'
import { Outlet } from 'react-router-dom'


function App() {
 
  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default App
