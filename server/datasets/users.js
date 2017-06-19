var mongoose = require('mongoose');
module.exports = mongoose.model('User', {
	email: String,
	password: String,
	name: {type:String,text: true},
	role: String
}); 