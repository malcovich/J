var mongoose = require('mongoose');
module.exports = mongoose.model('Message', {
	userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	contactId :{type: mongoose.Schema.Types.ObjectId, ref: 'Contact'},
	list : [{
		text: String,
		author: String,
		date: String
	}]
}); 