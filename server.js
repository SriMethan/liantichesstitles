const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI

console.log(MONGODB_URI)

app.get('/', (req, res) => {
  res.send('Liatomic titles')
})

app.listen(PORT, () => {
  console.log(`Liatomic titles listening at http://localhost:${PORT}`)
})