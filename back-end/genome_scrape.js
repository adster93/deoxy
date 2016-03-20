var axios = require('axios');
var cheerio = require('cheerio');
var db = require('monk')('localhost/deoxy');
var genes = db.get('genes');

axios.get('http://evidence.pgp-hms.org/genomes')
  .then(function (response) {
    $ = cheerio.load(response.data);

    var table = $(".genome_list_table")[0];
    var rows = $(table).find("tr");

    continueScrape($, 1, rows);
  })
  .catch(function (response) {
    console.log(response);
  });

function continueScrape($, row, rows) {
  var columns = $(rows[row]).find("td");

  var profile_id =  $(columns[1]).text();
  getProfile(profile_id).then(function(profile) {
    var idColumn = $(columns[2]).find("input"); // Get last column input
    var genome_id = $(idColumn)[0].attribs.value; // Grab value from input
    getVariants(genome_id).then(function(variants) {
      profile.variants = variants;
      // insert profile to profiles collection
      genes.insert(profile)
      console.log(profile);
      if(row < rows.length){
        continueScrape($, row + 1, rows)
      } else {
        console.log("Done!");
      }
    })
  }).catch(function(error){
    console.log(error);
    if(row < rows.length){
      continueScrape($, row + 1, rows)
    } else {
      console.log("Done!");
    }
  });
}

function getProfile(profile_id) {
  return new Promise(function(resolve, reject){
    console.log("Gathering profile info for: ", profile_id);
    axios.get("https://my.pgp-hms.org/profile/" + profile_id)
      .then(function(response) {
        $ = cheerio.load(response.data);
        var demoData = $('.demographics')[0]
        var demoData2 = $(demoData).find("tr td")
        // var demoData3 = $(demoData2).text()
        // console.log(demoData2[2])
        // console.log(demoData2.length)
        // var demoData3 = demoData2.text()
        // // for(var row = 0; row <rows.length; row++){

        // // }
        console.log("Got profile", profile_id);
        var profile = {}
        profile.name = profile_id;
        for(var i = 0; i < 1; i++){
          var columns = $(demoData2[i])
          if($(demoData2[0]).text() == '' || $(demoData2[1]).text() == '' || $(demoData2[5]).text() == ''){
            console.log('Not enough data')
          }
          else{
            profile.dateOfBirth = $(demoData2[0]).text(),
            profile.sex = $(demoData2[1]).text(),
            profile.weight = $(demoData2[2]).text(),
            profile.height = $(demoData2[3]).text(),
            profile.bloodType = $(demoData[4]).text(),
            profile.race = $(demoData[5]).text()

            // {
            //   dateOfBirth: $(demoData2[0]).text(),
            //   sex: $(demoData2[1]).text(),
            //   weight: $(demoData2[2]).text(),
            //   height: $(demoData2[3]).text(),
            //   bloodType: $(demoData2[4]).text(),
            //   race: $(demoData2[5]).text()
            // })
          }
        }
        resolve(profile);
      }).catch(function(error){
        reject(error);
      });
  });
}

function getVariants(genome_id) {
  return new Promise(function(resolve, reject){
    console.log("Gathering info for: ", genome_id);
    axios.get("http://evidence.pgp-hms.org/genomes?display_genome_id=" + genome_id)
      .then(function(response) {
        $ = cheerio.load(response.data);

        var table = $(".variant_table")[0];
        var rows = $(table).find("tr");
        var variants = [];
        for (var row = 1; row < rows.length; row++) {
          var columns = $(rows[row]).find("td");
            variants.push({
              name: $(columns[1]).text(),
              importance: $(columns[2]).text(),
              evidence: $(columns[3]).text(),
              impact: $(columns[4]).text(),
              alleleFreq: $(columns[5]).text(),
              summary: $(columns[6]).text()
            })
        }
        resolve(variants);
      });
  });
}