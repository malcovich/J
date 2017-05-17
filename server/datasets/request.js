var mongoose = require('mongoose');
module.exports = mongoose.model('Request', {
	text: String,
	answerId: [String],
	requestDate: String,
	userId: String,
	deleted: Boolean
}); 