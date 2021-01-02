const register  = require('./register')
const login     = require('./login')
const aktivasi  = require('./aktivasi')
const forgot_password = require('./forgot')
const verify    = require('./verify')

module.exports = {
    register,
    login,
    aktivasi,
    forgot_password,
    verify
}