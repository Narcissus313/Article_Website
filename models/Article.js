const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "title is required"],
			maxlength: [50, "title must be up to 50 characters"],
			trim: true,
		},
		summary: {
			type: String,
			maxlength: [100, "title must be up to 50 characters"],
			trim: true,
		},
		content: {
			type: String,
			required: [true, "content is required"],
			minlength: [1, "content must be at least 1 characters"],
			maxlength: [3000, "content must be up to 3000 characters"],
			trim: true,
		},
		pic: {
			type: String,
			required: [true, "content is required"],
			trim: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
			required: [true, "author is required"],
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("article", ArticleSchema);
