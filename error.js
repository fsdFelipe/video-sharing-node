export const error = (status, message)=>{
    const erro = new Error()
    erro.status = status
    erro.message = message
    return erro
}