import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { socket } from './Login'
import Header from '../Components/Header'

const Chat = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const userId = useSelector((state) => state.auth.id)
  const userName = useSelector((state) => state.auth.userName)
  const [text, setText] = useState('')
  const [messages, setMessages] = useState([])

  const handleClick = (e) => {
    e.preventDefault()
    socket.emit('leaveRoom', {userId, id})
    navigate('/')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!text){
      console.log('Enter text first')
      return
    }
    socket.emit('privateMessage', {userId, id, userName, text})
    setText('')
  }

  useEffect(() => {
    socket.on('receiveMessage', (information) => {
      setMessages((prevMessages) => [...prevMessages, information])
    })

    return () => {
      socket.off('receiveMessage')
    }
  }, [])


  return (
    <div style={{height: "100vh", background: "lightGreen"}}>
      <div>
        <Header />
        <button onClick={handleClick} style={{cursor: "pointer"}}>Go back</button>
      </div>
      <div style={{marginTop: "5px", height: "580px", overflowY: "scroll"}}>
        {
          messages.map((msg, index) => (
            <div key={index} style={{position: "relative", marginLeft: msg.userId !== userId && "500px",
              display: "flex", alignItems: "center", marginTop: "5px"
            }}>
              <p style={{backgroundColor: "pink", padding: "5px"}}>{msg.userName === userName ? "You" : msg.userName}</p>
              <p style={{backgroundColor: "yellow", padding: "5px"}}>{msg.text}</p>
            </div>
          ))
        }
      </div>
      <div>
        <form onSubmit={handleSubmit} style={{position: "absolute", bottom: "5px", marginLeft: "80px"}}>
          <input type='text' placeholder='Enter message' value={text} onChange={(e) => setText(e.target.value)} style={{width: "500px", padding: "5px"}} />
          <button type='submit' style={{cursor: "pointer", padding: "5px", marginLeft: "2px"}}>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Chat