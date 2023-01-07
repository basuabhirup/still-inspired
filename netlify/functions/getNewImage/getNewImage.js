const fetch = require('node-fetch')

const API_URL = "https://api.unsplash.com/photos/random"
const queries = "still-life-photography,still-life,objects,food,nature"

const handler = async () => {
  let response
  try {
    const res = await fetch(`${API_URL}?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${queries}`)
    response = await res.json()
    console.log(`Fetched image with url: ${response.urls.regular}`)
  } catch (err) {
    console.error(err)
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

module.exports = { handler }
