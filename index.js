const geocode = require('./utils/geocode.js')
const weather = require('./utils/weather.js')

let query = ''

if (process.argv.length < 3) {
	return console.log('Please add a location to query.')
} else if (process.argv.length === 3) {
	query = process.argv[2]
} else {
	const queryArr = process.argv.slice(2)
	queryArr.map(param => {
		query += param + ' '
	})
}

geocode(query, (error, data) => {
	if (error) {
		return console.log(`Error: ${error}`)
	} else {
		const { latitude, longitude, location } = data
		weather(latitude, longitude, (error, forecast) => {
			error ? console.log(`Error: ${error}`) : console.log(forecast)
		})
	}
})
