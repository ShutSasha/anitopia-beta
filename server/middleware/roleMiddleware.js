const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = function (roles) {
	return function (req, res, next) {
		if (req.method === "OPTIONS") {
			next();
		}

		try {
			const token = req.headers.authorization.split(" ")[1];

			if (!token) {
				return res
					.status(401)
					.json({ message: "Пользователь не авторизован 1" });
			}
			const { roles: userRoles } = jwt.verify(
				token,
				process.env.JWT_ACCESS_SECRET
			);

			let hasRole = false;

			userRoles.forEach((role) => {
				if (roles.includes(role)) {
					hasRole = true;
				}
			});

			if (!hasRole) {
				return res.status(403).json({ message: "У вас нет доступа" });
			}
			next();
		} catch (e) {
			console.log(e);
			return res
				.status(401)
				.json({ message: "Пользователь не авторизован 2" });
		}
	};
};
