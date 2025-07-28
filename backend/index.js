import express from 'express'
import { DB } from './db.js'
import user from './routes/user.js'

const app = express()


app.use(express.json())

// databse coneection
DB()

// routes
app.use('/user',user)


const PORT=3000


app.listen(PORT,()=>{
    console.log(`server is connected on :${PORT}`)
}) 