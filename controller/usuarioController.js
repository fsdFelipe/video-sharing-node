import {error} from "../error.js"
import Usuario from "../model/Usuario.js"

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (id) {
      const usuarioUpdate = await Usuario.findByIdAndUpdate(id,
        { $set : req.body},
        {new: true}
        );
      return res.status(200).json(usuarioUpdate);
    } else {
      next(error);
    }
  } catch (erro) {
    return next(error(403, "voce só pode alterar sua conta"));
  }
  };