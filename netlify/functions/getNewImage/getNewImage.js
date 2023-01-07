const fetch = require('node-fetch')

const handler = async () => {
  fetch(`https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=still-life-photography,still-life,objects,food,nature`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      return {
        statusCode: 200,
        body: data,
      }
    })
    .catch((error) => {
      console.error(error)
      return {
        statusCode: 500,
        // Could be a custom message or object i.e. JSON.stringify(err)
        body: JSON.stringify({ msg: error.message }),
      }
    })

  let response
  try {
    const res = await fetch(`https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=still-life-photography,still-life,objects,food,nature`)
    response = await res.json()
  } catch (err) {
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
