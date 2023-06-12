//package to create computer Model
const { Schema } = require('mongoose')

const sessionSchema = new Schema(
    {
        user_id: { type: Schema.Types.ObjectId, ref: 'User' },
        song_id: { type: Schema.Types.ObjectId, ref: 'Song' },
        duration: { type: Number, required: true },
        mood: { type: Number, required: true },
        focus: { type: Number, required: true },
        notes: { type: String, required: true },
        tempo: { type: Number, required: true },
        date: { type: Date, required: true },
    }, 
    { timestamps: true }
)

module.exports = sessionSchema