const mongoose = require('mongoose')

//Create the parameters for the user scheme
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    lastname:{
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    nodepartment:{
        type: String,
        required: true,
        min: 1,
        max: 10
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 512
    },
    pass: {
        type: String,
        required: true,
        min: 6,
        max: 18
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User',userSchema)