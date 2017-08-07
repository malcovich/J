var mongoose = require('mongoose');
module.exports = mongoose.model('User', {
	email: String,
	password: String,
	img:String,
	name: {type:String, text: true},
	role: String,
	token:String,
	phone : String,
	hardNumber: Boolean,
	imgName : String,
	smallImg : String,
	bounds : {
		top: String,
		left: String,
		right: String,
		bottom: String
	},
	fbId: String,
	linked_contact: {type: mongoose.Schema.Types.ObjectId, ref: 'Contact'}
}); 