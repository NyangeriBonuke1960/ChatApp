import Auth from '../models/AuthModel.js'

class AuthUseCase{
    async registerUser(userName, email, password){
        try{
            const user = await Auth.create({userName, email, password})
            return user
        }
        catch(error){
            throw new Error(error)
        }
    }

    async findUserByEmail(email){
        try{
            const user = await Auth.findOne({email})
            return user
        }
        catch(error){
            throw new Error(error)
        }
    }

    async getAllUsers(){
        try{
            const users = await Auth.find()
            return users
        }
        catch(error){
            throw new Error(error)
        }
    }
}

export default new AuthUseCase