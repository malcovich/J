var mongoose = require('mongoose');
module.exports = mongoose.model('Request', {
	text: String,
	answerId: [String],
	requestDate: String,
	userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	deleted: Boolean,
	viewed : [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}); 