import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/usuarioRoute.js'
import videoRoutes from './routes/videoRoute.js'
import commentRoutes from './routes/commentRoute.js'
import authRoutes from './routes/authRoute.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())
app.use('/api/usuarios', userRoutes)
app.use('/api/videos', videoRoutes)
app.use('/api/comments', commentRoutes)

app.use('/api/auth',cors(), authRoutes)

app.use(cookieParser())

/* Configuração do cors
const corsOptions = {
  origin :'http://localhost:3000',
    header : ("Access-Control-Allow-Origin", "*"),
    header : ("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"),
    methods: ['GET','POST','DELETE','UPDATE','PUT']
} */

app.use((erro,req,res, next)=>{
    const status = erro.status || 500
    const message = erro.message || 'Algo Errado !'
    return res.status(status).json({
        success : false,
        status,
        message
    })
})

const connect =()=>{
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log('Conectado ao MongoDB cloud')
    }).catch((erro)=>{
        throw erro
    })
}

app.listen(8800, ()=>{
    connect()
    console.log('Servidor iniciado na porta 8800')
})