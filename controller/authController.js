import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import Usuario from '../model/Usuario.js'
import jwt from "jsonwebtoken"

export const signup = async (req, res, next) =>{
    //console.log(req.body)
    try{
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.senha, salt)
        const newUser = new Usuario({...req.body, senha: hash})

        await newUser.save()
        res.status(200).send('Usuario Cadastrado')
    }catch(erro){
        next(erro)
    }
    
}

export const signin = async (req, res, next) =>{
    //console.log(req.body)
    try{
        const usuario = await Usuario.findOne({nome: req.body.nome})
       if(!usuario) return next(createError(404), 'Usuario não encontrado')
        
       const isCorrect = await bcrypt.compare(req.body.senha, usuario.senha)
       if(!isCorrect) return next(createError(404), 'Login ou senha incorretos')

       const token = jwt.sign({id: usuario._id}, process.env.JWT)
       const{senha, ...others} = usuario._doc
       res.cookie("access_token", token,{httpOnly:true}).status(200).json(others)
    }catch(erro){
        next(erro)
    }
}