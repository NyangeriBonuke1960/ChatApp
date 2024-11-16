import express from 'express'
import AuthController from '../controllers/AuthController.js'

const authRouter = express.Router()

authRouter.post('/signup', AuthController.signup)
authRouter.post('/login', AuthController.login)
authRouter.get('/users', AuthController.findUsers)

export default authRouter