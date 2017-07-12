var mongoose = require('mongoose');
module.exports = mongoose.model('Friend', {
	useridinvite: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	useridaccept: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	accepted: Boolean,
	deleted: Boolean,
	sendreq: Boolean
}); 
