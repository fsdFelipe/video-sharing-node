import express from 'express'
import {test} from '../controller/usuarioController.js'

const router = express.Router()

router.get('/teste', test)

export default router;