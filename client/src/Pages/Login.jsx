import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../utils/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'

export let socket;

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    if(!email || !password){
      console.log('Enter credentials')
      return
    }

    try{
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      })

      if(response.data.user._id){
        console.log(response.data)
        const {_id, userName, email} = response.data.user
        const {access_token, refresh_token} = response.data
        dispatch(setCredentials({
          id: _id,
          userName: userName,
          email: email,
          access_token: access_token,
          refresh_token: refresh_token
        }))
        socket = io('http://localhost:8000')
        navigate('/')
      }
      else{
        console.log('Wrong credentials')
      }
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <div style={{display: "flex", flexDirection: "column", marginLeft: "550px", marginTop: "50px"}}>
      <h3>Login</h3>
      <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", alignItems: 'baseline'}}>
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit' style={{cursor: "pointer"}}>Login</button>
      </form>
      <p>Do you have an account? <Link to='/signup'>Signup</Link></p>
    </div>
  )
}
