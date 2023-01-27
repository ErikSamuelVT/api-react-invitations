const mongoose = require('mongoose')

//Create the parameters for the invitation scheme
const invitationSchema = mongoose.Schema({
    guestName: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    entryTime:{
        type: String,
        required: true,
    },
    expiredInvitation:{
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Invitation',invitationSchema)