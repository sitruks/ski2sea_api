# Tableau Web Data Connector with a JSON API using Ski to Sea Race Data  

## Node Express App WDC Example

    This is my first run at building a Tableau WDC. For this example, I chose to connect to the Ski to Sea API, referenced below.

    The files are divided between local (dev) and production folders. The live connector is hosted via the 'prod' folder, but can access it here:

The hardest part of the project was to determine which example to start from. I ended up testing just about every project from the Tableau WDC Github, and after running into a persistent issue with CORS realized the easiest solution required a node express app.

## References  
- https://skitosea.com/results  
- http://results.skitosea.com/api/v1/20XX/results [2009 - 2019]  
- http://www.tableau.com/  
- https://github.com/tableau/webdataconnector  