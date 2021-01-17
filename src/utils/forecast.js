const request = require('request')
forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=3f0a9c72f19276b28229751425e77502&query=' + latitude + ',' + longitude
  request({ url, json: true }, (error, { body }) => {
    // const data = JSON.parse(response.body) on ly if you don't set json:true
    console.log("body=", body)
    if (error) {
      callback('Cannot connect to weather app network', undefined)
    } else if (body.error) {
      callback('unable to find location', undefined)

    } else {
      callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees outside. It feels like " + body.current.feelslike + " degrees." + "\n" + "Current Windspeed is " + body.current.wind_speed + " humidity is " + body.current.humidity)
    }
  })

}

module.exports = forecast