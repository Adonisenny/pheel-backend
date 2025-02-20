import express from 'express'
import { login, logout, Register } from '../controllers/userControllers.js'


const router = express.Router()


router.post('/register', Register)
router.post('/login', login)
router.post('/logout',logout)



export default router;