var mongoose = require('mongoose');
module.exports = mongoose.model('Predefined', {
	name: String,
	description: String,
	img : String
}); 