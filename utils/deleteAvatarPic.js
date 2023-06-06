const { unlink } = require("fs/promises");
const { join } = require("path");

const deleteAvatarPic = async (avatar) => {
	if (
		avatar !== "/images/userAvatars/default-avatar.png" &&
		avatar !== "/images/userAvatars/admin.png"
	) {
		console.log(join(__dirname, "../public", avatar));
		try {
			await unlink(join(__dirname, "../public", avatar));
		} catch (error) {}
	}
	return;
};

module.exports = deleteAvatarPic;
