import {error} from "../error.js"
import Usuario from "../model/Usuario.js"

//Alterar dados do usuario
export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (id === req.usuario.id) {
      const usuarioUpdate = await Usuario.findByIdAndUpdate(id,
        { $set : req.body},
        {new: true}
        );
      return res.status(200).json(usuarioUpdate);
    } else {
      next(error(403, "voce só pode alterar sua conta"));
    }
  } catch (erro) {
    return next(error);
  }
  };

  //Deletar usuario
  export const deleteUser = async (req, res, next) => {
    const {id} = req.params
    if (id === req.usuario.id) {
      try {
        await Usuario.findByIdAndDelete(id);
        res.status(200).json("Usuario deletado !");
      } catch (erro) {
        next(erro);
      }
    } else {
      return next(error(403, "Voce só pode deletar sua conta!"));
    }
  };

  // Get Usuario
  export const getUser = async (req, res, next) =>{
    try{
      const usuario = await Usuario.findById(req.params.id)
      res.status(200).json(usuario)
    }catch(erro){
      next(erro)
    }
  }

  //Subscribe
  export const subscribe = async (req, res, next) =>{
    try{
      await Usuario.findByIdAndUpdate(req.usuario.id,{
        $push: { subscribedUsers : req.params.id}
      })
      await Usuario.findByIdAndUpdate(req.params.id,{
        $inc :{ subscribers : 1}
      })
      res.status(200).json('Subscription successful')
    }catch(erro){
      next(erro)
    }
  }

   //Unsubscribe
   export const unsubscribe = async (req, res, next) =>{
    try{
      await Usuario.findByIdAndUpdate(req.usuario.id,{
        $push: { subscribedUsers : req.params.id}
      })
      await Usuario.findByIdAndUpdate(req.params.id,{
        $inc :{ subscribers : -1}
      })
      res.status(200).json('unsubscription successful')
    }catch(erro){
      next(erro)
    }
  }