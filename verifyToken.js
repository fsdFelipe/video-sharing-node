import jwt from "jsonwebtoken"
import {error} from './error.js'

export const verifyToken = (req, res, next)=>{
    const header = req.headers.cookie
    if(!header){
        return next(error(403, 'Voce não esta Logado'))
    }
    try {
        const token = req.headers.cookie.split('=')[1]
        jwt.verify(token, process.env.JWT, async (erro,usuario)=>{
            if(erro) return next(error(401,'Token invalido'))
            req.usuario = usuario,
            next()
        })
    } catch (erro) {
        next(erro)
    }
}
