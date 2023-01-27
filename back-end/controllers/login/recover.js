const bcrypt = require('bcrypt')
const userSchema = require('../../models/user')
const {validatedRecover} = require('../../models/user.validation')

const recover = async (req, res) => {
    ////Get the request data
    const {email, newPassword} = req.body

    //Validate the data obtained
    try{
        await validatedRecover.validateAsync(req.body)
    }catch(error){

        if(error.details[0].message === '"email" must be a valid email'){
            return res.json({
                error: true,
                message: "Ingrese un correo valido",
                data: error.details[0].message
            })
        }

        if(error.details[0].message === '"newPassword" length must be at least 6 characters long' ||
        '"newPassword" length must be less than or equal to 18 characters long'){
            return res.json({
                error: true,
                message: "La contraseña debe ser de 6 a 18 caracteres",
                data: error.details[0].message
            })
        }
    }

    //Validate if the email exists
    const emailExist = await userSchema.findOne({email})

    //If the email not exists reponse with the error
    if(!emailExist){
        return res.json({
            error: true,
            message: "El correo no existe"
        })
    }

    //Get the id from user
    const idUser = emailExist._id

    //Encrypt the password with bcrypt
    const salt = await bcrypt.genSalt(10)
    const newPass = await bcrypt.hash(newPassword, salt)

    //Update the new password from user in the bd
    try{
        const updatedUser =  await userSchema.findByIdAndUpdate(idUser,{pass: newPass})

        //Response with the information obtained
        res.json({
            error: false,
            message: "Contraseña actualizada",
            data: "Password updated"
        }) 
    }catch(error){
        
        //Response if exists a error when updating the information
        return res.json({
            error: true,
            message: "Ocurrio un error al crear el usuario",
            data: error.message
        })
    }
}

module.exports = {recover}