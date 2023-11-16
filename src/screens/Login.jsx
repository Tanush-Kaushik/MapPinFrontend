import React, { useRef } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Login() {

  let navigate = useNavigate()

  const emailRef = useRef()
  const passwordRef = useRef()

  const handleSubmit=async(e)=>{
    e.preventDefault()

    let response = await fetch('https://mappinbackend.onrender.com/api/login', {    // http://localhost:5000/api/login
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email:emailRef.current.value,
                    password:passwordRef.current.value,
                })
            })

            let res = await response.json()

            if(!res.success){
              alert(res.message)
            }
            else{
              // alert("login successful")
              localStorage.setItem('userEmail',emailRef.current.value)
              navigate('/')
            }
  }

  return (
    <div style={{textAlign:"center"}}>
      <div><Navbar/></div>
      <form onSubmit={handleSubmit} className='registerForm'>
        <h4 className='rh'>Email</h4>
        <input type='email' placeholder='email' ref={emailRef}/>
        <h4 className='rh'>Password</h4>
        <input type='password' placeholder='password' ref={passwordRef}/>
        <button type='submit' id='rsub'>Submit</button>
        <h4 style={{marginTop:"5em"}}>How to use :</h4>
        <p><ArrowForwardIosIcon style={{fontSize:"1em"}}/>Double click to pin a location after login</p>
        <p><ArrowForwardIosIcon style={{fontSize:"1em"}}/>Click on a pin to get review</p>
      </form>
    </div>
  )
}
