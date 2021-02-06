// initialize socket io to tell the server that we got connected to it
const socket = io()

// this will hold how many sockets connected to the server in the real time
const clientsTotal = document.getElementById('clients-total')
// the messages container that contain each new message
const messageContainer = document.getElementById('message-container')
// the name of the sender of the message
const nameInput = document.getElementById('name-input')
// the form that sends the message
const messageForm = document.getElementById('message-form')
// the body of the message
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
    // send a message only if the message input has a value to be sent
    if (messageInput.value === '') return
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
    // persist the message we sent in th UI 
    addMessageToUI(true, data)
    // reset the message input
    messageInput.value = ""
}

// listen to the message that the server is broadcasting to all the connected clients
socket.on('chat-message', (data) => {
    // show it in the consoles of all the windows except the one that sent the message
    console.log(data)
    // false cause the message is coming from the server
    addMessageToUI(false, data)
})

const addMessageToUI = (isOwnMessage, data) => {
    const element = `
        <li class="${isOwnMessage ? "message-right" : "message-left"}">
            <p class="message">
                ${data.message}
                <span>${data.name} ● ${moment(data.date).fromNow()}</span>
            </p>
        </li>
    `
    // add the message element to the messages container
    messageContainer.innerHTML += element
    scrollToBottom()
}

// scroll to bottom of the messages container automatically
const scrollToBottom = () => {
    messageContainer.scrollTo(0, messageContainer.scrollHeight)
}