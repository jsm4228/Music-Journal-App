//package to create computer Model
const { Schema } = require('mongoose')

const userSchema = new Schema(
    {
        user_id: { type: String, required: true },
    }, 
    { timestamps: true }
)

module.exports = userSchema