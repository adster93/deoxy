var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var geneSchema = new Schema({
	name:String
});

module.exports = mongoose.model('genes', geneSchema)