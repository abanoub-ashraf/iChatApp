// initialize socket io to tell the server that we got connected to it
const socket = io()

// this will hold how many sockets connected to the server in the real time
const clientsTotal = document.getElementById('clients-total')

// this event wil get fired in the server and send us this data to log in the browser
// this event will be emitted from the server to tell the client here 
socket.on('clients-total', (data) => {
    clientsTotal.innerText = `Total Clients: ${data}`
})