var mongoose = require('mongoose');
module.exports = mongoose.model('Friend', {
	_idmy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	_idfriend: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	accepted: Boolean
}); 
