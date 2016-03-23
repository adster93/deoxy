# deoxy

This app is built off of the human genome project. Reports mostly from 23andMe that were 
submitted to the public genome and I scraped the data with a custom scraper.

The original site had very low loading speeds because it was running on an outdated web framework. I thought this would
be a great time to put my Biology degree and software development skills to the test on this two week project endeavor.

Using the scraped data, I used SVGs and D3 to display this data in an aesthetic and interactive way. The data can and will
be constantly updated as long as the public genome project database continutes to update as well. All that is needed
is to create a mongodb, create a database named deoxy with a collection called genes, and run the scraper with 
node genome_scrape.js.

Enjoy!
