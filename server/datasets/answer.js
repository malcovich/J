var mongoose = require('mongoose');
module.exports = mongoose.model('Answer', {
	requestId: {type: mongoose.Schema.Types.ObjectId, ref: 'Request'},
	userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	contacts :[{type: mongoose.Schema.Types.ObjectId, ref: 'Contact'}],
	viewed : [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}); 