const invitationSchema = require('../../models/invitations')
const { validatedInvitation } = require('../../models/invitation.validation')

const addInvitation = async (req, res) => {
    //Get the request data
    const { guestName, entryTime, expiredInvitation } = req.body

    //Validate the data
    try {
        await validatedInvitation.validateAsync(req.body)
    } catch (error) {
        if (error.message === '"guestName" length must be at least 3 characters long') {
            return res.json({
                error: true,
                message: error.message
            })
        }

        if (error.message === '"entryTime" is not allowed to be empty') {
            return res.json({
                error: true,
                message: error.message
            })
        }

        if (error.message === '"expiredInvitation" is not allowed to be empty') {
            return res.json({
                error: true,
                message: error.message
            })
        }
    }

    //Create the invitation with schema invitation
    const invitation =  new invitationSchema({ guestName, entryTime, expiredInvitation})
    
    //Save the invitation in the bd
    try{
        const saveInvitation =  await invitation.save()
        const {_id, guestName, entryTime, expiredInvitation} = saveInvitation;

        //Response with the information saved
        return res.json({
            error: false,
            message: "Invitation saved",
            data: {_id, guestName, entryTime, expiredInvitation}
        })
    }catch(error){
        //Response if exists a error
        return res.json({
            error: true,
            message: error.message
        })
    }
}

module.exports = { addInvitation }