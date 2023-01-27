const invitationSchema = require('../../models/invitations')

const deleteInvitation = async (req, res) => {
    //Get the request data
    const {idDoc} = req.body
    
    //Delete the doc from db by _id
    try {
        const docDeleted = await invitationSchema.findByIdAndDelete(idDoc)

        //Response with the information deleted
        return res.json({
            error: false,
            message: "Document deleted",
            data: docDeleted
        })
    } catch (error) {
        //Respond if there is an error when deleting a document
        return res.json({
            error: true,
            message: error.message
        })
    }
}

module.exports = { deleteInvitation }