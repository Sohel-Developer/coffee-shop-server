const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

/* Middelware */

app.use(cors())
app.use(express.json())























app.get('/', (req, res) => {
    res.send('Coffee Shop Server Running.')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})