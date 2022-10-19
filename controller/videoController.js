import { error } from "../error.js"
import Usuario from "../model/Usuario.js"
import Video from "../model/Video.js"

//Adicionar Video
export const addVideo = async (req, res, next) =>{
    const newVideo = new Video({ userId : req.usuario.id, ...req.body})

    try{
        const savedVideo = await newVideo.save()
        res.status(200).json(savedVideo)
    }catch(erro){
        next(erro)
    }
}

//Alterar Video
export const updateVideo = async (req, res, next) =>{
    try{
        const video = await Video.findById(req.params.id)
        if(!video){
            return next(error(404,"Video not found"))
        }
        if(req.usuario.id === video.usuarioId){
            const updatedVideo = await Video.findByIdAndUpdate(
                req.params.id,{
                    $set : req.body
                },
                {new : true}
            )
            res.status(200).json(updatedVideo)
        }else{
            return next(error(403,'Voce so pode alterar seu video'))
        }
    }catch(erro){
        next(erro)
    }
}

//Delear Video
export const deleteVideo = async (req, res, next) =>{
    try{
        const video = await Video.findById(req.params.id)
        if(!video){
            return next(error(404,"Video not found"))
        }
        if(req.usuario.id === video.usuarioId){
            await Video.findByIdAndDelete(
                req.params.id,
            )
            res.status(200).json('Video Deletado')
        }else{
            return next(error(403,'Voce so pode deletar seu video'))
        }
    }catch(erro){
        next(erro)
    }
}

//Alterar Video
export const getVideo = async (req, res, next) =>{
    try{
        const video = await Video.findById(req.params.id)
        if(!video){
            return next(error(404,"Video not found"))
        }else{
            res.status(200).json(video)
        }
    }catch(erro){
        next(erro)
    }
}

//Adicionar View
export const addView = async (req, res, next) =>{
    try{
         await Video.findByIdAndUpdate(req.params.id,{
            $inc : { views : 1}
         })
         res.status(200).json('Visualizaçao adicionada')
    }catch(erro){
        next(erro)
    }
}
//videos random
export const random = async (req, res, next) =>{
    try{
       const videos =  await Video.aggregate([{ $sample : {size:40}}])
         res.status(200).json(videos)
    }catch(erro){
        next(erro)
    }
}

//videos trend
export const trend = async (req, res, next) =>{
    try{
       const videos =  await Video.find().sort({ views: -1})
         res.status(200).json(videos)
    }catch(erro){
        next(erro)
    }
}

//videos sub
export const sub = async (req, res, next) =>{
    try{
       const usuario = await Usuario.findById(req.usuario.id)
       const subscribedChannels = usuario.subscribedUsers

       const list = await Promise.all(
        subscribedChannels.map( async (channelId) =>{
            return await Video.find(({userId : channelId}))
        })
       )
       res.status(200).json(list.flat().sort((a,b => b.createdAt - a.createdAt)))
    }catch(erro){
        next(erro)
    }
}

//videos get by tag
export const getByTag = async (req, res, next) =>{
    const tags = req.query.tags
    try{
       const videos =  await Video.find({tags : {$in: tags}}).limit(20)
         res.status(200).json(videos)
    }catch(erro){
        next(erro)
    }
}

//videos get by search
export const search = async (req, res, next) =>{
    const query = req.query.busca
    try{
       const videos =  await Video.find({
        title : {$regex: query, $options: 'i'},
       }).limit(40)
         res.status(200).json(videos)
    }catch(erro){
        next(erro)
    }
}