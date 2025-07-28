import mongoose from "mongoose"

export const DB =()=>{
     mongoose.connect('mongodb://127.0.0.1:27017/CURD').then((res)=>{
         console.log('mongodDB is connected')
     }).catch((err)=> console.log(err))
}