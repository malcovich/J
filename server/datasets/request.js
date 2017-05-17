var mongoose = require('mongoose');
module.exports = mongoose.model('Request', {
	text: String,
	answerId: [String],
	userId: String
}); 