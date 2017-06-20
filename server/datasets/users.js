var mongoose = require('mongoose');
module.exports = mongoose.model('User', {
	email: String,
	password: String,
	img:String,
	name: {type:String,text: true},
	role: String
}); 