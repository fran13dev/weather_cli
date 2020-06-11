const got = require('got')

const geocode = (address, callback) => {
	const request = async () => {
		try {
			const token =
				'pk.eyJ1IjoiZmRldmlsbGllcnMiLCJhIjoiY2s5ZTE3b2I4MDhoYjNnbXVoZDU1cHk1MyJ9.Fx00MRbHSEeNNi1NGTAsIQ'
			const url = encodeURI(
				`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${token}`
			)
			const response = await got(url, {
				responseType: 'json',
			})
			const data = response.body.features

			if (data.length < 1) {
				callback('Location not found. Please try again', undefined)
			} else {
				callback(undefined, {
					// Mapbox result has longitude first.
					latitude: data[0].center[1],
					longitude: data[0].center[0],
					location: data[0].place_name,
				})
			}
		} catch (error) {
			callback('Unable to connect to Mapbox API', undefined)
		}
	}
	request()
}

module.exports = geocode
