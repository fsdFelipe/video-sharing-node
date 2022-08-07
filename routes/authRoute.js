import express from 'express'
import {signup, signin} from '../controller/authController.js'

const router = express.Router()

//novo usuario
router.post('/signup', signup)
//login
router.post('/signin', signin)
//google auth

export default router;
