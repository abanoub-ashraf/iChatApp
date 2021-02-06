// initialize socket io to tell the server that we got connected to it
const socket = io()

// this will hold how many sockets connected to the server in the real time
const clientsTotal = document.getElementById('clients-total')

const messageContainer = document.getElementById('message-container')
const nameInput = document.getElementById('name-input')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')

// send a new message from the submit button of this form
messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    sendMessage()
})

// this event wil get fired in the server and send us this data to log in the browser
// this event will be emitted from the server to tell the client here 
socket.on('clients-total', (data) => {
    clientsTotal.innerText = `Total Clients: ${data}`
})

const sendMessage = () => {
    // create the message we wanna send to the server
    const data = {
        // the sender of the message
        name: nameInput.value, 
        // the body of the message
        message: messageInput.value,
        // the timestamp of the message
        dateTime: new Date()
    }
    // now emit the message to the server
    socket.emit('message', data)
}

// listen to the message that the server is broadcasting to all the connected clients
socket.on('chat-message', (data) => {
    console.log(data)
})