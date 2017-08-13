var mongoose = require('mongoose');
module.exports = mongoose.model('Contact', {
	/*name: {type:String, text: true},*/
	name: String,
	email: String,
	password : String,
	spec: {type:String, text: true},
	phone: String,
	raiting: Number,
	description: String,
	hidden: Boolean,
	category :  {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
	verifyContact : {type: mongoose.Schema.Types.ObjectId, ref: 'Contact'},
	userId: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
	userCreated : Boolean,
	type_work_place :String,
	address: String,
	working_days : String,
	working_days_by_contacts: []
}); 