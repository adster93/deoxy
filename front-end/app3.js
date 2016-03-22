d3.json('https://pure-cove-57024.herokuapp.com/api/samples', function(err, data){
  d3.select('.namesContainer')
  .data(data)
  .enter()
  .append("button")
  .attr("class", "participant")
  .attr("class", "buttonPulse")
  .text(function(d){
  	return d.name
  })
  .style("background-color", "black")
  .on("click", function(d){
	// d3.json("http://localhost:3000/api/sample/" + d.name)
 //    .header("Content-Type", "application/json")
 //    .get(JSON.stringify({name : d.name}), function(error, data) {
 //    	d3.select(".participant")
	// 	  .append("a")
	// 	  .attr("href", "index3.html?sample=" + data[0].name)
	// 	  .html("new page");
 //    	console.log(error);
 //    	console.log(data)
 //    	console.log(data)
 //    })
 window.location.assign("index3.html?sample=" + d.name)
})
})

