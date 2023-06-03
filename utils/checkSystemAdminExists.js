const User = require("../models/User");

const checkSystemAdminExists = async () => {
	const systemAdmin = new User({
		firstName: "systemAdmin",
		lastName: "systemAdmin",
		gender: "male",
		username: "systemAdmin",
		phoneNumber: "09123654589",
		password: "systemAdmin",
		role: "ADMIN",
		avatar: "/images/userAvatars/default-avatar.png",
	});

	const systemAdminExists =
		(await User.findOne({ username: systemAdmin.username })) ||
		(await User.findOne({ phoneNumber: systemAdmin.phoneNumber }));

	if (!!systemAdminExists)
		return console.log("[+] System Admin Already Exists...");

	try {
		systemAdmin.save();

		console.log("[+] System Admin Created...");
	} catch (err) {
		console.log("error making system admin");
	}
};
module.exports = checkSystemAdminExists;
