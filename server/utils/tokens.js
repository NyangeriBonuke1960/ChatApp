import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const generateAccessToken = (user) => {
    const payLoad = {id: user._id, userName: user.userName, email: user.email}

    const token = jwt.sign(payLoad, process.env.ACCESS_TOKEN, {expiresIn: '10m'})

    return token
}

const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader){
        res.status(400).json('No authorization header')
        return
    }

    const token = authHeader.split(' ')[1]
    if(!token){
        res.status(400).json('Token not found')
        return
    }

    try{
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)
        req.user = decoded
        next()
    }
    catch(error){
        res.status(403).json({msg: "Invalid token"})
        return
    }
}

const generateRefreshToken = (user) => {
    const payLoad = {id: user._id, userName: user.userName, email: user.email}

    const token = jwt.sign(payLoad, process.env.REFRESH_TOKEN, {expiresIn: '1h'})

    return token
}

const verifyRefreshToken = (token) => {
    try{
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN)
        return decoded
    }
    catch(error){
        res.status(403).json('Invalid token')
        return
    }
}

export default { generateAccessToken, verifyAccessToken, generateRefreshToken, verifyRefreshToken }