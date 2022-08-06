import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/usuarioRoute.js'

const app = express()
dotenv.config()

app.use(express.json())
app.use('/api/usuarios', userRoutes)

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