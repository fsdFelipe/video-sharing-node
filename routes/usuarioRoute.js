import express from 'express'
import {verifyToken } from '../verifyToken.js'
import { updateUser} from '../controller/usuarioController.js'

const router = express.Router()

//update Usuario
router.put('/:id',verifyToken, updateUser)

export default router;