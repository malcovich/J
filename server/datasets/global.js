var mongoose = require('mongoose');
module.exports = mongoose.model('Global', {
	name: String,
	description: String,
	userId: String
}); 