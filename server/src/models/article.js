const mongoose = require('mongoose');
const {Schema} = mongoose;

const articleSchema = Schema({
    title: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    subtitle: {
        type: String
    },
    text: {
        type: String,
        required: true
    },
    categories: [{
        type: Schema.Types.ObjectId, ref: 'Category'
    }],
    user: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

module.exports = mongoose.model("Article", articleSchema);