const mongoose = require('mongoose')
const userSchema = require('./userModel')
const songSchema = require('./songModel')
const sessionSchema = require('./sessionModel')

const User = mongoose.model('User', userSchema)
const Song = mongoose.model('Song', songSchema)
const Session = mongoose.model('Session', sessionSchema)

module.exports = {
    User,
    Song,
    Session
}
