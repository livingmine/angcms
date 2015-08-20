var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Training = new Schema({
	title: String,
	description: String,
	speaker: String,
	date: Date
});

var Training = mongoose.model('Training', Training);
module.exports = Training;


