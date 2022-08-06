const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv') 

const app = express()
dotenv.config()

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