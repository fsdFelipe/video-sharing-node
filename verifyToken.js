import jwt from "jsonwebtoken"
import {error} from './error.js'

export const verifyToken = (req, res, next)=>{
   const token = req.headers.cookie.split('=')[1]
    
    if(!token) return next(error(403, "Voce nao esta logado"))

   jwt.verify(token, process.env.JWT, async (erro,usuario)=>{
        if(erro) return next(error(401,'Token invalido'))
        req.usuario = usuario,
        next()
    })
}
