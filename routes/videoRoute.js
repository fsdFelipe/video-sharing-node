import express from 'express'
import {test} from '../controller/videoController.js'

const router = express.Router()

router.get('/', test)

export default router;