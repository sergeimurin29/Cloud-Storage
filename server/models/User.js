const {Schema, model} = require("mongoose");
const {ObjectId} = require("mongodb");

const User = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatar: {type: String},
    diskSpace: {type: Number, default: 1024 ** 3 * 10},
    usedSpace: {type: Number, default: 0},
    files: [{type: ObjectId, ref: "File"}],
});
module.exports = model("User");
