const bcrypt = require('bcrypt')
const userSchema = require('../../models/user')
const {validatedRegiter} = require('../../models/user.validation')

const register = async (req, res) => {

    //Get the request data
    const {name, lastname, nodepartment, email, password} = req.body
    
    //Validate the data obtained
    try{
        await validatedRegiter.validateAsync(req.body)
    }catch(error){
        if(error.details[0].message === '"name" length must be at least 3 characters long' ||
        '"name" length must be less than or equal to 50 characters long'){
            return res.json({
                error: true,
                message: "El nombre debe ser de 3 a 50 caracteres",
                data: error.details[0].message
            })
        }

        if(error.details[0].message === '"lastname" length must be at least 3 characters long' ||
        '"lastname" length must be less than or equal to 50 characters long'){
            return res.json({
                error: true,
                message: "El apellido debe ser de 3 a 50 caracteres",
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

        if(error.details[0].message === '"password" length must be at least 6 characters long' ||
        '"password" length must be less than or equal to 18 characters long'){
            return res.json({
                error: true,
                message: "La contraseña debe ser de 6 a 18 caracteres",
                data: error.details[0].message
            })
        }
        
    }

    //Validate if the email exists
    const emailExist = await userSchema.findOne({email})
    //If the email exists reponse with the error
    if(emailExist){
        return res.json({
            error: true,
            message: "El correo ya existe",
            data: "The mail already exists"
        })
    }

    //Encrypt the password with bcrypt
    const salt = await bcrypt.genSalt(10)
    const pass = await bcrypt.hash(password, salt)

    //Create the user
    const user =  new userSchema({ name, lastname, nodepartment, email, pass})

    //Save the user in the db
    try{
        const saveUser =  await user.save()
        const {_id, name, email, date} = saveUser;

        //Response with the information saved
        return res.json({
            error: false,
            message: "User saved",
            data: {_id, name, lastname, nodepartment, email, date}
        })
    }catch(error){

        //Response if exists a error when save the information
        return res.json({
            error: true,
            message: "Ocurrio un error al crear el usuario",
            data: error.message
        })
    }
}

module.exports = {register}