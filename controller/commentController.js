import {error} from "../error.js"
import Comments from "../model/Comments.js"
import Video from "../model/Video.js"

export const addComment = async (req, res, next) =>{
    const newComment = await new Comments({...req.body, userId : req.usuario.id})
    try {
        const savedComment = await newComment.save()
        res.status(200).send(savedComment)
    } catch (erro) {
       next(erro) 
    }
}

export const deleteComment = async (req, res, next) =>{
    try {
       const comment = await Comments.findById(res.params.id)
       const video = await Video.findById(res.params.id)

       if(req.usuario.id === comment.userId || req.usuario.id === video.userId){
        await Comments.findByIdAndDelete(req.params.id)
        res.status(200).json("Comment has been deleted")
       } else{
        return next( error(403,' Voce nao pode deletar esse comentario'))
       }
    } catch (erro) {
       next(erro) 
    }
}
export const getComments = async (req, res, next) =>{
    try {
       const comments = await Comments.find({videoId: req.params.videoId}) 
       res.status(200).json(comments)
    } catch (erro) {
       next(erro) 
    }
}