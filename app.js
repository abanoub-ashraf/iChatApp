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

// contains all the connected sockets
let connectedSockets = new Set()

// initialize socket.io using the server we created
const io = require('socket.io')(server)

io.on('connection', (socket) => {
    // any client will connect to the socket.io will be logged here
    console.log(colors.yellow(`A socket is connected: ${socket.id}`))
    // add each client connected socket to the connected sockets set
    connectedSockets.add(socket.id)

    // the change in the size when we add a new socket will trigger this event
    // we will emit this event to the client to log the size of the sockets there
    io.emit('clients-total', connectedSockets.size)

    // when a socket is disconnected
    socket.on('disconnect', () => {
        console.log(colors.red(`A socket is disconnected ${socket.id}`))
        // remove the disconnected socket from the connected sockets
        connectedSockets.delete(socket.id)

        // the change in the size when we delete a disconnected socket will trigger this event
        // we will emit this event to the client to log the size of the sockets there
        io.emit('clients-total', connectedSockets.size)
    })
})