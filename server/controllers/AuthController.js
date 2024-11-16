import AuthUseCase from "../usecases/AuthUseCase.js";
import bcrypt, { genSalt } from 'bcrypt';
import tokens from "../utils/tokens.js";
import dotenv from 'dotenv'
dotenv.config()

class AuthController{
    async signup(req, res){
        const {userName, email, password} = req.body
        if(!userName || !email || !password){
            res.status(400).json('Wrong Credentials')
            return
        }

        try{
            const exists = await AuthUseCase.findUserByEmail(email)
            if(exists){
                res.status(400).json('User already exists')
                return
            }

            const salt = await genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            const user = await AuthUseCase.registerUser(userName, email, hashedPassword)
            res.status(200).json(user)
        }
        catch(error){
            res.status(500).json(error)
        }
    }

    async login(req, res){
        const {email, password} = req.body
        if(!email || !password){
            res.status(400).json('Wrong credentials')
            return
        }

        try{
            const exists = await AuthUseCase.findUserByEmail(email)
            if(!exists){
                res.status(400).json('Wrong credentials')
                return
            }

            const checkPassword = await bcrypt.compare(password, exists.password)

            if(!checkPassword){
                res.status(400).json('Wrong credentials')
                return
            }

            const access_token = await tokens.generateAccessToken(exists)
            const refresh_token = await tokens.generateRefreshToken(exists)
            
            res.status(200).json({user: exists, access_token, refresh_token})
        }
        catch(error){
            res.status(500).json(error)
        }
    }

    async getAccessToken(req, res){
        const { refresh_token } = req.body
        if(!refresh_token){
            res.status(400).json('Enter refresh token')
            return
        }

        try{
            jwt.verify(refresh_token, process.env.REFRESH_TOKEN, (err, decoded) => {
                if(err){
                    res.status(403).json({message: 'Invalid or expired refresh token'})
                    return
                }

                const payLoad = {id: decoded._id, email: decoded.email, userName: decoded.userName}
                const newAccessToken = jwt.sign(payLoad, process.env.ACCESS_TOKEN, {expiresIn: '10m'})
                return res.json({access_token: newAccessToken})
            })
        }
        catch(error){
            res.status(500).json(error)
        }
    }

    async findUsers(req, res){
        try{
            const users = await AuthUseCase.getAllUsers()
            return res.json({users: users})
        }
        catch(error){
            res.status(500).json(error)
        }
    }
}

export default new AuthController