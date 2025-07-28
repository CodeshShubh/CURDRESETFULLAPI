import mongoose from "mongoose";



const schema =  new mongoose.Schema({

    name:{
        type:String,
        required:[true, 'Plese Enter your name first'],
        minLength:[3,"Please enter at Least 3 Latters for your name"],
    },
    email:{
        type:String,
        required:[true, 'Please Enter your Email'],
        unique:[true, 'Enter Unique Email']
    },
    age:{
        type:Number,
        required:[true, 'Plese Enter your age']
    },
    profession:{
        type:String,
        default:'N/A'
    }

},{timestamps:true})


export const User = mongoose.model('User',schema)