// Funksjonen som tar info fra skjema og oppdaterer visittkortet
function submitVisittkort() {
    let navn = document.getElementById("navnInput").value; // Henter navn
    let kjonn = document.getElementById("kjonnInput").value; // Henter kjønn
    let stilling = document.getElementById("stillingInput").value; // Og så videre...
    let telefon = document.getElementById("telefonInput").value;
    let fodselsdag = document.getElementById("fodselsdagInput").value;
    let harForerkort = document.getElementById("harForerkortInput").checked ? "Ja" : "Nei";
    let bakgrunnFarge = document.getElementById("bakgrunnInput").value;
    let rammeValgt = document.querySelector('input[name="ramme"]:checked').value;

    // Setter hentet info inn i visittkort-divs
    document.getElementById("navnDisplay").textContent = navn;
    document.getElementById("kjonnDisplay").textContent = "Kjønn: " + kjonn;// Resten av felter oppdateres her...
    document.getElementById("stillingDisplay").textContent = "Stilling: " + stilling;
    document.getElementById("telefonDisplay").textContent = "Telefon: " + telefon;
    document.getElementById("fodselsdagDisplay").textContent = fodselsdag;
    document.getElementById("harForerkortDisplay").textContent = "Førerkort: " + harForerkort;

// Oppdaterer stilen på visittkortet med valgt bakgrunnsfarge og ramme
let visittkort = document.getElementById("visittkort");
visittkort.style.backgroundColor = bakgrunnFarge;
visittkort.style.borderStyle = rammeValgt;
}

// Last opp og vis bilde
function submitVisittBilde() {
let bildeInput = document.getElementById("bildeInput");
let bildeDisplay = document.getElementById("bildeDisplay");
bildeDisplay.innerHTML = ''; // Sletter tidligere bilde

// OBS: Denne delen er skrevet av chatGPT (det var du helge som ga meg tillatelse til å bruek dette på denne delen)
//Sjekker om et bilde er valgt og viser dett
if (bildeInput.files && bildeInput.files[0]) {
    let bildeURL = URL.createObjectURL(bildeInput.files[0]);
    let img = document.createElement("img");
    img.src = bildeURL;

    // Styler bildet for visning
    img.style.width = "100px"; // Bredde
    img.style.height = "70px"; // Høyde

    bildeDisplay.appendChild(img); // Legger til bildet i visittkortet
}
}

// Event listener for å automatisk laste opp bilde når det er valgt
document.getElementById("bildeInput").addEventListener("change", submitVisittBilde);

document.getElementById("bildeInput").addEventListener("change", submitVisittBilde);
