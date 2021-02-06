const path = require('path')
const express = require('express')
const colors = require('colors')

const app = express()

// the index.html file will load once the app start on the server cause of this static serving for it
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 4000

const server = app.listen(PORT, () => {
    console.log(colors.magenta(`💬 server is up and running on port ${PORT}`).underline)
})