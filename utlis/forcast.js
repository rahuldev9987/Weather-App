const request = require('request')

const forcast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=4d047cf0cdcd72f0fe2635a17b70cfef&query=${latitude},${longitude}`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to coonect to reather services', undefined)
        } else if (body.error) {
    
            callback('Unable to find Location ..f', undefined)
        } else {
            callback(undefined, 'Its currently ' + body.current.temperature + ' and Its feels like ' + body.current.feelslike)
        }
    })
}
module.exports = forcast