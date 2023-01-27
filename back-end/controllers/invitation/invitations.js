const invitationSchema = require('../../models/invitations')

const invitations = async (req, res) => {

    //Get data
    try {
        const invitations = await invitationSchema.find()
        //Response with the information obtained
        return res.json({
            error: false,
            message: "query successfully",
            data: invitations
        })
    } catch (error) {

        //Response if exists a error when obtain the information
        return res.json({
            error: true,
            message: error.message
        })
    }

}

module.exports = { invitations }