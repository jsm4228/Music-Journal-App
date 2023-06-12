//package to create tablet Model
const { Schema } = require('mongoose')

const songSchema = new Schema(
    {
        song_name: { type: String, required: true },
        artist_name: { type: String, required: true},
        guitar_tab_url: {type: String, required: true},
    }, 
    { timestamps: true }
)

module.exports = songSchema