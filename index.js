import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/usuarioRoute.js'
import videoRoutes from './routes/videoRoute.js'
import commentRoutes from './routes/commentRoute.js'
import authRoutes from './routes/authRoute.js'
import cookieParser from 'cookie-parser'

const app = express()
dotenv.config()

app.use(express.json())
app.use('/api/usuarios', userRoutes)
app.use('/api/videos', videoRoutes)
app.use('/api/comments', commentRoutes)

app.use('/api/auth', authRoutes)

app.use(cookieParser())

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