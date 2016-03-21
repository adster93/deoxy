var express = require('express');
var router = express.Router();
var app = express()
var db = require('monk')('localhost/deoxy');
var genes = db.get('genes');


/* GET home page. */

router.get('/api', function(req,res){
	genes.find({}, function (err, docs){
		res.json(docs)
	});
})

router.post('/api/males', function(req,res){
	// genes.find({}, function (err, docs){
	// 	res.json(docs)
	// });
	genes.find({"name": req.body.name}, function(err, docs){
		console.log(docs)
		res.send(docs)
	})

	console.log(req.body.name)
})

module.exports = router;    
