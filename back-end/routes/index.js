const express = require('express')
const router = express.Router()

//Import of controllers
const {login, register, recover} = require('../controllers/login/index')
const {invitations, addInvitation, deleteInvitation} = require('../controllers/invitation/index')

/**
 * Middleware to validate token
 * //const {verifyToken} = require('../middlewares/validateToken')
 */

//User routes
router.post('/login', login)
router.post('/register', register)
router.post('/recover', recover)


//INVITATION ROUTES
router.get('/invitations', invitations)
router.post('/addInvitation', addInvitation)
router.delete('/deleteInvitation', deleteInvitation)

module.exports = router