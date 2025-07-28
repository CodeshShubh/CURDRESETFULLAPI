import express from 'express'
import { addData, allUsers, professionStats, removeData, searchUser, updateUser } from '../controllers/user.js';

const router = express.Router()



router.post('/add',addData)
router.get('/allUsers',allUsers).get('/searchUser',searchUser).get('/stats',professionStats)
router.delete('/removeOneUser',removeData)
router.patch('/updateUser/:id', updateUser)



export default router;