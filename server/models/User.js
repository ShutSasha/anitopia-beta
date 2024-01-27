const { Schema, model } = require("mongoose");

const User = new Schema({
	username: { type: String, unique: true, required: true },
	email: {type: String, unique: true,required: true},
	password: { type: String, required: true },
	firstName: {type: String, required:false},
	lastName: {type: String, required: false},
	country : {type: String, required: false},
	Age: {type: Number, required: false},
	roles: [{ type: String, ref: "Role" }],
});

module.exports = model("User", User);
