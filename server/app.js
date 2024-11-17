import express from 'express'
import './db.js'
import authRouter from './routes/route.js'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}))
app.use(express.json())

app.use('/api', authRouter)

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
    console.log('A user connected')

    socket.on('disconnect', () => {
        console.log('A user disconnected')
    })

    socket.on('joinRoom', ({userId, id}) => {
        const roomName = [userId, id].sort().join('_')
        console.log(roomName)
        socket.join(roomName)
    })

    socket.on('leaveRoom', ({userId, id}) => {
        const roomName = [userId, id].sort().join('_')
        console.log(roomName)
        socket.leave(roomName)
    })

    socket.on('privateMessage', ({userId, id, userName, text}) => {
        const roomName = [userId, id].sort().join('_')
        console.log(text)
        io.to(roomName).emit('receiveMessage', {userId, id, userName, text})
    })
})

server.listen('8000', () => {
    console.log('Server started')
})