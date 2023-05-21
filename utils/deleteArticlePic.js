const { unlink } = require("fs/promises");
const { join } = require("path");

const deleteAvatarPic = async (pic) => {
	try {
		await unlink(join(__dirname, "../public", pic));
	} catch (error) {
		console.log("error deleting article pic");
	}
	return;
};
module.exports = deleteAvatarPic;
