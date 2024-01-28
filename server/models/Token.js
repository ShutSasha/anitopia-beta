const {Schema, model} = require("mongoose")

const Token = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String, require: true},
})

module.exports = model('Token', Token);
