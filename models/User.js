const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, "firstname is required"],
			minlength: [3, "firstname must be at least 3 characters"],
			maxlength: [30, "firstname must be up to 30 characters"],
			trim: true,
		},
		lastName: {
			type: String,
			required: [true, "lastname is required"],
			minlength: [3, "lastname must be at least 3 characters"],
			maxlength: [30, "lastname must be up to 30 characters"],
			trim: true,
		},
		username: {
			type: String,
			required: [true, "username is required"],
			minlength: [3, "username must be at least 3 characters"],
			maxlength: [30, "username must be up to 30 characters"],
			trim: true,
			unique: true,
		},
		phoneNumber: {
			type: String,
			required: [true, "phone number is required"],
			trim: true,
			unique: true,
		},
		gender: {
			type: String,
			enum: ["not-set", "male", "female"],
			default: "not-set",
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
		},
		role: {
			type: String,
			enum: ["ADMIN", "BLOGGER"],
			default: "BLOGGER",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

UserSchema.pre("save", async function (next) {
	if (!this.isNew && !this.isModified("password")) return next();

	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);

		return next();
	} catch (err) {
		next(err);
	}
});

UserSchema.pre("findOneAndUpdate", async function (next) {
	const user = this._update;
	
	if (user.password) {
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password, salt);
	}
	return next();
});

UserSchema.methods.validatePassword = function (data) {
	return bcrypt.compare(data, this.password);
};

module.exports = mongoose.model("user", UserSchema);
