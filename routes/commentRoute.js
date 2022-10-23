import express from 'express'
import {getComments, addComment, deleteComment} from '../controller/commentController.js'
import {verifyToken} from '../verifyToken.js'

const router = express.Router()

router.get('/:videoId', getComments)
router.post('/', verifyToken, addComment)
router.delete('/:id', verifyToken, deleteComment)

export default router;