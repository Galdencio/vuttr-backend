const mongoose = require('../../database');

const ToolSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    link: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    tags: [{
        type: String
    }]
}, { versionKey: false });

ToolSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

const Tool = mongoose.model('Tool', ToolSchema);

module.exports = Tool;