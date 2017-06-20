var mongoose = require('mongoose');
module.exports = mongoose.model('Contact', {
	/*name: {type:String, text: true},*/
	name: String,
	email: String,
	password : String,
	spec: {type:String, text: true},
	phone: String,
	place: String,
	raiting: String,
	description: String,
	hidden: Boolean,
	verifyContact : {type: mongoose.Schema.Types.ObjectId, ref: 'Contact'},
	userId: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}); 