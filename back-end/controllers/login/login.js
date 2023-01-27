const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = require('../../models/user')
const {validatedLogin} = require('../../models/user.validation')

const login = async (req, res) => {
    //Get the request data
    const {email, password} = req.body

    //Validate the data obtained
    try{
        await validatedLogin.validateAsync(req.body)
    }catch(error){
        if(error.details[0].message === '"password" length must be at least 6 characters long' ||
        '"password" length must be less than or equal to 18 characters long'){
            return res.json({
                error: true,
                message: "La contraseña debe ser de 6 a 18 caracteres",
                data: error.details[0].message
            })
        }

        if(error.details[0].message === '"email" must be a valid email' ||
        '"email" length must be at least 6 characters long'){
            return res.json({
                error: true,
                message: "Ingrese un correo valido",
                data: error.details[0].message
            })
        }

        
    }

    //Validate if the email exists
    const user = await userSchema.findOne({email})

    //If the email not exists reponse with the error
    if(!user){
        return res.json({
            error: true,
            message: "El correo no existe",
            data: "The mail does not exist"
        })
    }

    //Validate if the password is correct
    const validPassword = await bcrypt.compare(password, user.pass)
    //If the password is incorrect reponse with the error
    if(!validPassword){
        return res.json({
            error: true,
            message: "Contraseña no valida",
            data: "Invalid password"
        })
    }
    
    //Create a token for the user whith some information
    const token = jwt.sign({
        id: user._id,
        name: user.name,
        registrationDay: user.date

    },process.env.TOKEN_SECRET)

    //Send the token in the header 
    res.header('auth-token',token).json({
        error: false,
        message: "Loged",
        token: {token}
    })

    
}

module.exports = {login}