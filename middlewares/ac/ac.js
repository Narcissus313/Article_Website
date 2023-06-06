const createError = require("http-errors");

const roleAc = (roles) => {
	return (req, _res, next) => {
		if (roles.includes(req.session.user?.role)) return next();
		next(createError(403, "Access Denied!"));
	};
};

module.exports = {
	roleAc,
};
