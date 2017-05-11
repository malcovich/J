var mongoose = require('mongoose');
module.exports = mongoose.model('Friend', {
	name: String,
	phone: String,
	userId: String
}); 