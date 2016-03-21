var express = require('express');
var url = require('url');
var router = express.Router();
var db = require('monk')('localhost/deoxy');
var genes = db.get('genes');
genes.index("name")




/* GET home page. */

router.get('/api', function(req,res){
	genes.find({}, function (err, docs){
		res.json(docs)
	});
})


router.get('/api/samples', function(req,res){
	genes.find({}, "name", function(err ,docs){
		res.json(docs)
	})
})

router.get('/api/sample/:names', function(req, res, next){
	var personName = req.params.names;
	console.log(req.query.names)
	console.log('GETTING THE NAME FROM CLIENT, ' , personName );
	genes.find({name: personName}, function(err, docs) {
		console.log(docs)
		res.json(docs)
	})
	// 	genes.find({}, "names", function(err ,docs) {
	// 		if(err){
	// 			console.log("THERES AN ERROR", err);
	// 		} else {
	// 			res.json(docs)
	// 		}
	// })
})


//Get data from names and render new svg based on searched
//name


// router.get('/api/names/:geneName', function(req,res){
// 	genes.find({"name": req.query.geneName}), function(err,docs){
// 		if(err){
// 			console.log(err)
// 		}
// 		else{
// 			console.log(docs)
// 		}
// 	}
// })

// router.get('/api/names', function(req, res){
// 	genes.find({"name": req.body.geneName}, function(err, docs){
// 		console.log(docs)
// 		res.send(docs)
// 	})
// })

module.exports = router;    
