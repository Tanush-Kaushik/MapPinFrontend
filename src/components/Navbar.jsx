import React, { useState } from 'react'
import '../styles.css'
import { Link, useNavigate } from 'react-router-dom'


export default function Navbar() {

  let navigate = useNavigate()
  const [curUser,setCurUser]= useState(null)

  const handleLogout = ()=>{
    localStorage.removeItem('userEmail')
    navigate('/')
    window.location.reload(false);
  }

  return (
    <div id='bang'>
      <h3 style={{ float: "left", marginLeft: "10px", color: "#4d79c5" }}>Mappin</h3>

      {localStorage.getItem('userEmail') ?
        <button id='logout' onClick={handleLogout}>Logout</button>
        :
        <>
          <Link id='login' to='/login'>Login</Link>
          <Link id='register' to='/register'>Register</Link>
        </>
      }
    </div>
  )
} 
