import bcrypt from 'bcryptjs'
import Usuario from '../model/Usuario.js'
import jwt from "jsonwebtoken"
import {error} from '../error.js'

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
    console.log(req.body)
    try{  
        const usuario = await Usuario.findOne({nome: req.body.nome})
       if(!usuario) return next(error(404, 'Usuario não encontrado'))
        
       const isCorrect = await bcrypt.compare(req.body.senha, usuario.senha)
       if(!isCorrect) return next(error(400, 'Login ou senha incorretos'))

       const token = jwt.sign({id: usuario._id}, process.env.JWT)
       const{senha, ...others} = usuario._doc
       res.cookie('access_token ', token,{ httpOnly:true}).status(200).json(others)
       console.log(others)

    }catch(erro){
        next(erro)
    }
}

export const googleAuth = async (req, res, next) =>{
    try {
        const user = await Usuario.findOne({email: req.body.email})
        if(user){
            const token = jwt.sign({id: usuario._id}, process.env.JWT)
            res.cookie('access_token ', token,{ httpOnly:true}).status(200).json(user._doc)
        }else{
            const newUser = new Usuario({
                ...req.body,
                fromGoogle: true
            })
            const savedUser = await newUser.save()
             const token = jwt.sign({id: savedUser._id}, process.env.JWT)
            res.cookie('access_token ', token,{ httpOnly:true}).status(200).json(savedUser._doc)
        }
    } catch (error) {
        next(error)
    }
}
