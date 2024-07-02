// messages.js
function addMessage(message) {
    const messagesDiv = document.getElementById('messages');
    const p = document.createElement('p');
    p.textContent = message;
    messagesDiv.appendChild(p);
}

// Globálisan elérhetővé tesszük az addMessage függvényt
window.addMessage = addMessage;
