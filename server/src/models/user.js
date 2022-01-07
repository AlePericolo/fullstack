const mongoose = require('mongoose');
const {Schema} = mongoose;

const { emailValidator } = require("../utils/validation")

const userSchema = Schema({
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
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

module.exports = mongoose.model("User", userSchema);