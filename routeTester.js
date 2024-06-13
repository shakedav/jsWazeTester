const { Parser } = require('json2csv');
const fs = require('fs');

const wazeUrl = 'https://www.waze.com/live-map/api/user-drive?geo_env=il';
const NUM_PATHS = 3;
const INTERVAL = 15;
const origin = {"y": 32.09634, "x": 34.920628}; // Givat hashlosha
const destination = {"y": 32.134484701, "x": 34.828659093}; // Hakfar Hayarok

const payload = {
  "from": origin,
  "to": destination,
  "nPaths": NUM_PATHS,
  "useCase": "LIVEMAP_PLANNING",
  "interval": INTERVAL,
  "arriveAt": true
};

fetch(wazeUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(payload)
})
.then(response => response.json())
.then(data => {
        const responses = data.alternatives.map(alternative => {
            return {
                date: new Date().toISOString(),
                isFastest: alternative.response.isFastest,
                time: alternative.response.totalSeconds / 60,
                length: alternative.response.totalLength / 1000,
                route: alternative.response.routeName.replace(';', ',')
            };
        });
        const parser = new Parser({ header: false });
        const csv = parser.parse(responses);
    
        fs.appendFile('output.csv', csv + '\n', { encoding: 'utf8' }, (err) => {
            if (err) {
                console.error('Error:', err);
            } else {
                console.log('Response has been written to output.csv');
            }
        });
})
.catch((error) => {
  console.error('Error:', error);
});