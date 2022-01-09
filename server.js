const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Liatomic titles')
})

app.listen(PORT, () => {
  console.log(`Liatomic titles listening at http://localhost:${PORT}`)
})