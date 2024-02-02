module.exports = class UserDto {
	username;
	id;
	isActivated;
	roles;
	avatarLink;
	registrationDate

	constructor(model) {
		this.username = model.username;
		this.id = model._id;
		this.isActivated = model.isActivated;
		this.roles = model.roles;
		this.avatarLink = model.avatarLink;
		this.registrationDate = model.registrationDate;
	}

};
