const mongoose = require('mongoose');
const { emailValidator } = require("../utils/validation")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'email is required',
        validate: {
            validator: function (value) {
                return emailValidator(value)
            },
            message: 'email is invalid'
        }
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("User", userSchema);