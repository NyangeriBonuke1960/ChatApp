import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/chatapp')
.then(() => {
    console.log('Mongodb connected')
})
.catch((error) => {
    console.log(error)
})