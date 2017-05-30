var mongoose = require('mongoose');
module.exports = mongoose.model('Answer', {
	requestId: {type: mongoose.Schema.Types.ObjectId, ref: 'Request'},
	userId: String,
	contacts :[{type: mongoose.Schema.Types.ObjectId, ref: 'Contact'}]
}); 