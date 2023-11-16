import React, { useRef} from 'react'
import '../styles.css'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Register() {

  let navigate = useNavigate()

  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  const handleSubmit=async(e)=>{
    e.preventDefault()

    let response = await fetch('https://mappinbackend.onrender.com/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name:nameRef.current.value,
                    email:emailRef.current.value,
                    password:passwordRef.current.value,
                })
            })

            let res = await response.json()

            if(!res.success){
              alert(res.message)
            }
            else{
              // alert("succcessful register")
              localStorage.setItem('userEmail',emailRef.current.value)
              navigate('/')
            }
  }

  return (
    <div style={{textAlign:"center"}}>
      <div><Navbar/></div>
      <form onSubmit={handleSubmit} className='registerForm'>
        <h4 className='rh'>Name</h4>
        <input type='text' placeholder='name' ref={nameRef}/>
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
