const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next) => {
    //Get token from headers
    const token = req.header('auth-token')
    //If the token not exist response with the error
    if(!token) return res.json({
        error: true,
        message: `Acceso denegado`
    })
    //Validate token
    try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRET)
        req.user = verified
        //If the token is correct pass to the next function
        next()
    }catch(error){
        //Response if exists a error when valitade the token
        res.json({
            error: true,
            message: 'Token invalido',
            data:error
        })
    }
}

module.exports = {verifyToken}