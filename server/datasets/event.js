var mongoose = require('mongoose');
module.exports = mongoose.model('Event', {
	/*name: {type:String, text: true},*/
	time :String,
	date: String,
	comment : String,
	contactId : {type: mongoose.Schema.Types.ObjectId, ref: 'Contact'},
	userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	status: Boolean
}); 