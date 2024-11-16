import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { socket } from './Login'

const Chat = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const userId = useSelector((state) => state.auth.id)
  const [text, setText] = useState('')
  const [messages, setMessages] = useState([])

  const handleClick = () => {
    socket.emit('leaveRoom', {userId, id})
    navigate('/')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('privateMessage', {userId, id, text})
    setText('')
  }

  useEffect(() => {
    socket.on('receiveMessage', (information) => {
      console.log(information)
    })
  }, [])

  return (
    <div>
      <button onClick={handleClick} style={{cursor: "pointer"}}>Go back</button>
      <div>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Enter message' value={text} onChange={(e) => setText(e.target.value)} />
          <button type='submit' style={{cursor: "pointer"}}>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Chat