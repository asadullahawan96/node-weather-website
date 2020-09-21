const request = require("request");
const forecast = (lon, lat, callback) => {
    const options = {
      method: 'GET',
       url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
       qs: {lang: 'en', lon: lon, lat: lat},
       headers: {
         'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com',
         'x-rapidapi-key': 'e95f9710e4mshb374f5192caece3p190525jsn79f9b638cb10',
         useQueryString: true
       },
       json:true
     };
  
     request(options, (error, {body})=> {
      if (error) {callback('Unable to connect.',undefined)}
      else if(body.error)
      callback(body.error,undefined)
      else
      {
        callback(undefined, {
          temperature: body.data[0].temp
        })
      }
    });
}

module.exports = forecast 