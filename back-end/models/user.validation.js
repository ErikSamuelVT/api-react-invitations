const joi = require('joi');

//Schema to validate the information of recover user
const validatedRecover = joi.object({
    email: joi.string().min(6).max(512).required().email(),
    newPassword: joi.string().min(6).max(18).required()
})

//Scheme for validating user register
const validatedRegiter = joi.object({
    name: joi.string().min(3).max(50).required(),
    lastname: joi.string().min(3).max(50).required(),
    nodepartment: joi.string().min(1).max(10).required(),
    email: joi.string().min(6).max(512).required().email(),
    password: joi.string().min(6).max(18).required(),
})

//Scheme for validating user login
const validatedLogin = joi.object({
    email: joi.string().min(6).max(512).required().email(),
    password: joi.string().min(6).max(18).required()
})

module.exports = {validatedRegiter, validatedLogin, validatedRecover}