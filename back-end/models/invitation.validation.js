const joi = require('joi');

//Schema to validate the information of invitation
const validatedInvitation = joi.object({
    guestName: joi.string().min(3).max(50).required(),
    entryTime: joi.string().required(),
    expiredInvitation: joi.string().required(),
})

module.exports = {validatedInvitation}
