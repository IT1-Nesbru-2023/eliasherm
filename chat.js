
const firebaseConfig = {
    apiKey: "AIzaSyBQYkuTJL6HW2VAeqW0uI-70quN8VpFQ7U",
    authDomain: "chattjeneste.firebaseapp.com",
    projectId: "chattjeneste",
    storageBucket: "chattjeneste.appspot.com",
    messagingSenderId: "980369297210",
    appId: "1:980369297210:web:bfd21fe9beeb9dade28a03"
  };

// bare litt konfigurasjon av firebase
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

function login() {  //login funksjonen gjør chatteboksen synlig og "auth" boksen usynlig når man skriver inn et navn.
    const username = document.getElementById('username').value.trim() || 'Anonymous';
    document.getElementById('auth').style.display = 'none';
    document.getElementById('chat').style.display = 'block';
    document.getElementById('welcomeMessage').innerText = `Velkommen, ${username}!`; //velkommen melding

    // Laster inn alle tidligere meldinger fra Firebase.
    loadMessages();
}

function sendMessage() { //sender meldingen som bruker har skrevet i input, med korresponderende brukernavn
    
    const text = messageInput.value.trim();
    const username = document.getElementById('username').value.trim() || 'Anonymous';

    if (text !== '') {
        firestore.collection('messages').add({
            text: text,
            username: username,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {                  //hvis meldingen "sendes" riktig til firestore collectionen min, så kan vi se dette i konsollen.
            console.log("Message sent successfully");
        })
        .catch((error) => {
            console.error("Error sending message: ", error);
        });

        messageInput.value = '';
    }
}
function loadMessages() { //funksjon for å laste inn tidligere meldinger, historikk.
    const messagesDiv = document.getElementById('messages');
    

    firestore.collection('messages').orderBy("timestamp").onSnapshot((querySnapshot) => {//snapshot og querysnapshot sier at hele meldingshistorien lastes inn hver gang noe endres(nytt snapshot kommer.)
        messagesDiv.innerHTML = ''; // tidligere meldinger slettes slik at KUN den nye meldingen sendes. (i stedet for hele historikken)
        querySnapshot.forEach((doc) => {
            const message = doc.data();
            displayMessage(message.text, message.username);
        });
    });
}

function displayMessage(text, username) { //funksjonen bestemmer hvordan medingene skal vises, linje 62 f.eks bestemmer at brukernavnet skriver foran melding.
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${username}: ${text}`;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
document.getElementById('clearChatKnapp').addEventListener('click', function() { //ettersom noen sendte stygge ord (kacper og jan) laget jeg en rask funksjon for å slette meldinger.
    const password = prompt("Skriv inn hemmelig passord");                          //... men ikke hvem som helst kan slette alt! du kan se passordet da!
    if (password === "gyatthunter") {                                               
        clearChat();                                                              //jeg kaller clearChat funksjonen.
    } else {
        alert("Ikke riktig passord. Du er ikke sertifisert gyatthunter.");
    }
});

function clearChat() { //denne funksjonen  sletter alle dokumenter collectionen som jeg har kalt "messages", dvs. alle tidligere meldinger. doc.ref.delete
    firestore.collection('messages').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            doc.ref.delete();
        });
    }).then(() => {
        console.log("Chat history cleared successfully."); //oppdaterer konsoll.
    }).catch(error => {
        console.error("Error clearing chat history:", error);
    });
}
