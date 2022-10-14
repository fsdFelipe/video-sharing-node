import express from 'express'
import {verifyToken } from '../verifyToken.js'
import { updateUser, deleteUser, getUser} from '../controller/usuarioController.js'

const router = express.Router()

//update Usuario
router.put('/:id',verifyToken, updateUser)

//delete user
router.delete("/:id", verifyToken, deleteUser);

//get a user
router.get("/find/:id", getUser);

export default router;