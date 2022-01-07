const mongoose = require('mongoose');
const {Schema} = mongoose;

const categorySchema = Schema({
    label: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'label is required',
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

module.exports = mongoose.model("Category", categorySchema);