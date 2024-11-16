import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {socket} from './Login'

const Home = () => {
  const [users, setUsers] = useState([])
  const userId = useSelector((state) => state.auth.id)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async() => {
      try{
        const response = await axios.get('http://localhost:8000/api/users')
        const data = await response.data.users
        setUsers(data)
      }
      catch(error){
        console.log(error)
      }
    }

    fetchUsers()
  }, [])

  const handleClick = (id) => {
    navigate(`/chat/${id}`)
    socket.emit('joinRoom', {userId, id})
  }

  return (
    <div>
      <Header />
      <div style={{marginTop: "10px"}}>
        {users.map((user) => (
          <div onClick={() => handleClick(user._id)} key={user._id} style={{width: "600px", backgroundColor: "Green", color: "white", padding: "3px", cursor: "pointer"}}>
            <p style={{fontSize: "30px"}}>
              {user._id !== userId && user.userName}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home