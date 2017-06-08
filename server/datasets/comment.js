var mongoose = require('mongoose');
module.exports = mongoose.model('Comment', {
	contactId: {type: mongoose.Schema.Types.ObjectId, ref: 'Contact'},
	userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	date: String,
	text: String
}); 