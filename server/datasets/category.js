var mongoose = require('mongoose');
module.exports = mongoose.model('Category', {
	title: String,
	img: String
}); 