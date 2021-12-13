const mongoose = require('mongoose');
const { emailValidator } = require("../utils")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email is required',
        validate: {
            validator: function (value) {
                return emailValidator(value)
            },
            message: 'Email is invalid'
        }
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("User", userSchema);