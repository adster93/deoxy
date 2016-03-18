var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/deoxy')

var Gene = require('./models/genes')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


var router = express.Router()

router.use(function(req, res, next){
	console.log('Something happened')
	next()
})

router.get('/', function(req, res){
	res.json({message: 'hooray! welcome to our api!'})
})

router.route('/genes')

.post(function(req, res){
	var gene = new Gene();
	gene.name = req.body.name

	gene.save(function(err){
		if(err)
			res.send(err)
		res.json({message:'Gene created!'})
	})
})

.get(function(req,res){
	Gene.find(function(err, genes){
		if(err)
			res.send(err)
		res.json(genes)
	})
})

router.route('/genes/:gene_id')
.get(function(req, res){
	Gene.findById(req.params.gene_id, function(err, gene){
		if(err)
			res.send(err)
		res.json(gene)
	})
})

.put(function(req, res){
	Gene.findById(req.params.gene_id, function(err, gene){
		if(err)
			res.send(err)
		gene.name = req.body.name

		gene.save(function(err){
			if(err)
				res.send(err)

			res.json({message: 'gene updated!'})
		})
	})
})

.delete(function(req, res){
	Gene.remove({
		_id:req.params.gene_id
	}, function(err, gene){
		if(err)
			res.send(err)

		res.json({message: 'Successfully deleted'})
	})
})

app.use('/api', router)

app.listen(3000)
console.log('Magic happens on port 3000')