const request = require("request");

const geocode = (address, callback)=>{
    const option = {
      url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYXNhZHVsbGFoYXdhbiIsImEiOiJja2YxaGxtNGIwdWdrMzJwZDRoazJ3eGNyIn0.kHA_t5UCExP-JwUmTyT0Eg&limt=1',
      json:true
    };
  
    request(option, (error, {body})=> {
      if (error) {
        callback('Unable to connect to location services',undefined)
      }
      else if(body.features.length===0)
        callback('Unable to find location. Try another serach.',undefined)
      else{
        callback(undefined, {
        lat: body.features[0].center[0],
        lon: body.features[0].center[1],
        loc: body.features[0].place_name
        }  )
    
    }   
})
}

module.exports = geocode