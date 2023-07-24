const socket = io();
var audio=new Audio('notification.mp3');
const name = prompt("Enter Your Name ");
newuser();

function newuser() {
  
  
  const chatBox = document.getElementById("chatBox");
  const messageElement = document.createElement("div");
  messageElement.className = "message newuser";
  messageElement.textContent = `${name} joined the chat`;
  chatBox.appendChild(messageElement);
  socket.emit('new-user-joined',name);
  //audio.play();
  
}

// Function to send a message
function sendMessage() {
  const messageInput = document.getElementById("messageInput");
  const message = messageInput.value.trim();

  if (message !== "") {
    const chatBox = document.getElementById("chatBox");
    const messageElement = document.createElement("div");
    messageElement.className = "message sent";
    messageElement.textContent = `${message}:you`;
    chatBox.appendChild(messageElement);

    messageInput.value = "";
    messageInput.focus();

    // Scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;

    // Emit the message to the server
    socket.emit('chatMessage', message);
  }
}

// Event listener for clicking the "Send" button
document.getElementById("sendButton").addEventListener("click", function() {
  sendMessage();
});

// Event listener for pressing Enter key in the input field
document.getElementById("messageInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

// Receive chat messages from the server(joined chat message)
socket.on('new-user-joined', (name) => {
  const chatBox = document.getElementById("chatBox");
  const messageElement = document.createElement("div");
  messageElement.className = "message newuser";
  messageElement.textContent = `${name} joined the chat`;
  chatBox.appendChild(messageElement);
  audio.play();

  // Scroll to the bottom of the chat box
  chatBox.scrollTop = chatBox.scrollHeight;
});


// Receive chat messages from the server
socket.on('chatMessage', data => {
  const chatBox = document.getElementById("chatBox");
  const messageElement = document.createElement("div");
  messageElement.className = "message received";
  messageElement.textContent = `${data.name}:${data.message}`;
  chatBox.appendChild(messageElement);
  audio.play();

  // Scroll to the bottom of the chat box
  chatBox.scrollTop = chatBox.scrollHeight;
});

// Receive chat messages from the server(left chat message)
socket.on('user-left', (name) => {
  const chatBox = document.getElementById("chatBox");
  const messageElement = document.createElement("div");
  messageElement.className = "message newuser";
  messageElement.textContent = `${name} left the chat`;
  chatBox.appendChild(messageElement);
  audio.play();

  // Scroll to the bottom of the chat box
  chatBox.scrollTop = chatBox.scrollHeight;
});
