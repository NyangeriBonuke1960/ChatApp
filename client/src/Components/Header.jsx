import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeCredentials } from '../utils/authSlice'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userName = useSelector((state) => state.auth.userName)

  const logout = (e) => {
    e.preventDefault()
    dispatch(removeCredentials())
    navigate('/login')
  }

  return (
    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px",
      backgroundColor: "darkgreen", color: "white"
    }}>
      <h2>{userName}</h2>
      <button onClick={logout} style={{cursor: 'pointer', padding: "5px", backgroundColor: "white",
        borderRadius: "5px"
      }}>Logout</button>
    </div>
  )
}

export default Header