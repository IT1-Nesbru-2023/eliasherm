
const firebaseConfig = {
    apiKey: "AIzaSyBQYkuTJL6HW2VAeqW0uI-70quN8VpFQ7U",
    authDomain: "chattjeneste.firebaseapp.com",
    projectId: "chattjeneste",
    storageBucket: "chattjeneste.appspot.com",
    messagingSenderId: "980369297210",
    appId: "1:980369297210:web:bfd21fe9beeb9dade28a03"
  };

// Initialize Firebase using your configuration
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = firebase.firestore();

function login() {
    const username = document.getElementById('username').value.trim() || 'Anonymous';
    document.getElementById('auth').style.display = 'none';
    document.getElementById('chat').style.display = 'block';
    document.getElementById('welcomeMessage').innerText = `Welcome, ${username}!`;

    // Load messages after login
    loadMessages();
}

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const text = messageInput.value.trim();
    const username = document.getElementById('username').value.trim() || 'Anonymous';

    if (text !== '') {
        firestore.collection('messages').add({
            text: text,
            username: username,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            console.log("Message sent successfully");
        })
        .catch((error) => {
            console.error("Error sending message: ", error);
        });

        messageInput.value = '';
    }
}

// Load messages (optional)
function loadMessages() {
    const messagesDiv = document.getElementById('messages');
    

    firestore.collection('messages').orderBy("timestamp").onSnapshot((querySnapshot) => {
        messagesDiv.innerHTML = ''; // Clear previous messages
        querySnapshot.forEach((doc) => {
            const message = doc.data();
            displayMessage(message.text, message.username);
        });
    });
}

function displayMessage(text, username) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${username}: ${text}`;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
