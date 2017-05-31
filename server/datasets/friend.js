var mongoose = require('mongoose');
module.exports = mongoose.model('Friend', {
	name: String,
	phone: String,
	userId: String,
	friendId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}); 