import express from 'express'
import {verifyToken } from '../verifyToken.js'
import {subscribe, unsubscribe, updateUser, deleteUser, getUser, like, dislike} from '../controller/usuarioController.js'

const router = express.Router()

//update Usuario
router.put('/:id',verifyToken, updateUser)

//delete user
router.delete("/:id", verifyToken, deleteUser);

//get a user
router.get("/find/:id", getUser);

//subscribe a user
router.put("/sub/:id", verifyToken, subscribe);

//unsubscribe a user
router.put("/unsub/:id", verifyToken, unsubscribe);

//like a video of user
router.put('/like/:videoId', verifyToken, like)

//dislike a video of user
router.put('/dislike/:videoId', verifyToken, dislike)

export default router;