const { Schema, model } = require("mongoose");

const CommentSchema = new Schema(
	{
		content: {
			type: String,
			required: [true, "content is required"],
			maxlength: [500, "content must be up to 500 characters"],
			trim: true,
		},
		article: {
			type: Schema.Types.ObjectId,
			ref: "article",
			required: [true, "article is required"],
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: "user",
			required: [true, "author is required"],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = model("comment", CommentSchema);
