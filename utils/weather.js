const got = require('got')

const weather = (latitude, longitude, callback) => {
	const request = async () => {
		try {
			const access_key = 'c775e1afed8569d70132573f066df7bb'
			const url = encodeURI(
				`http://api.weatherstack.com/current?access_key=${access_key}&query=${latitude}, ${longitude}`
			)
			const response = await got(url, {
				responseType: 'json',
			})
			const { current, error } = response.body

			if (current) {
				const { temperature, feelslike } = current
				temperature === feelslike
					? callback(undefined, {
							current: `${temperature}\xB0C`,
					  })
					: callback(undefined, {
							current: `${temperature}\xB0C`,
							realfeel: `${feelslike}\xB0C`,
					  })
			} else {
				callback(`${error.type}: ${error.info}`, undefined)
			}
		} catch (e) {
			callback('Unable to connect to the API', undefined)
		}
	}
	request()
}

module.exports = weather
