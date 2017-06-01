var mongoose = require('mongoose');
module.exports = mongoose.model('Contact', {
	name: String,
	spec: String,
	phone: String,
	place: String,
	raiting: String,
	description: String,
	userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}); 