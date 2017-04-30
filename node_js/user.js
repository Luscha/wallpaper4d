var userState = {
		USER_GUEST : 0,
		USER_AUTHENTICATE : 1,
		USER_MAX_STATE : 2,
};

function User() {
	this.state = userState.USER_GUEST;
}

User.prototype.getState = function () {
	return this.state;
};

User.prototype.setState = function (state) {
	if (state >= userState.USER_MAX_STATE || state < userState.USER_GUEST){
		return;
	}

	this.state = state;
}

module.exports = {
	User,
	userState,
};
