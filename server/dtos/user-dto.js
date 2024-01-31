module.exports = class UserDto {
	username;
	id;
	isActivated;
	roles;

	constructor(model) {
		this.username = model.username;
		this.id = model._id;
		this.isActivated = model.isActivated;
		this.roles = model.roles;
	}
};
