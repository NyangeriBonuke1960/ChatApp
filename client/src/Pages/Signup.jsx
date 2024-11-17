import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()

    if(!userName || !email || !password || !confirmPassword){
      console.log('Missing credentials')
      return
    }

    if(password !== confirmPassword){
      console.log('Password does not match')
      return
    }

    try{
      const response = await axios.post('http://localhost:8000/api/signup', {
        userName,
        email,
        password
      })
      console.log(response.data)

      if(response.data._id){
        navigate('/login')
      }
      else{
        console.log('Error trying to signup')
      }
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <div style={{display: "flex", flexDirection: "column", marginLeft: "550px", marginTop: "50px"}}>
      <h3>Signup</h3>
      <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", alignItems: 'baseline'}}>
        <input type='text' placeholder='Enter Username' value={userName} onChange={(e) => setUserName(e.target.value)} />
        <input type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <button type='submit' style={{cursor: "pointer"}}>Signup</button>
      </form>
      <p>Already have an account? <Link to='/login'>Login</Link></p>
    </div>
  )
}

export default Signup