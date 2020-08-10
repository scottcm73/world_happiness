# World Happiness Data Maps

World_happiness Data Maps is a set of D3-based world Chloropleth maps intended for dynamic data visualizations. It uses JavaScript and ajax, and it needs to run with an http server.

## Getting Started



These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need python to produce the json file which combines all the years of data. You also need a browser to test the JavaScript, either Firefox or Chrome.

Modules needed for the python include os, csv, and json which are already installed as part of the python installation.


### Installing

Initial versions were going to run only with python, but I decided to make it in run on web pages. So, you only need to put the required files on a server. 



## Running the tests

Testing of the dynamic chloropleth maps was done manually with Firefox.


## Deployment

To run the JavaScript locally, go to the folder with the files in the command line, and run the command:

	python -m http.server

Then, type 127.0.0.1:8000/test.html into your browser's address bar.

## Built With

*  Microsoft excel was used to make the field names the same for all the files
*  Python was used to make all the csv files into a single json file.



## Versioning

I use github for versioning. For the versions available, see https://github.com/scottcm73/world_happiness/tree/master. 

## Author

* **Scott McMahan** 



## License

This project is free to use as long as you acknowlege it as a source.

## Acknowledgments

An initial version of a world chloropleth map was created by d3.org. Subsequent versions of the chloropleth maps were based on this map. Data for the project was taken from the World Happiness Report up to 2020 at Kaggle.com. 

## Reference

Most basic choropleth map in d3.js. d3.org Retrieved from: https://www.d3-graph-gallery.com/graph/choropleth_basic.html.

Aché, M. World Happiness Report up to 2020 Bliss scored agreeing to financial, social, etc. Kaggle.com. Retrieved from: 
https://www.kaggle.com/mathurinache/world-happiness-report.




