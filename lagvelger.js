document.getElementById('velgKnapp').addEventListener('click', function() {
    let navn = [];
    for (let i = 1; i <= 10; i++) {
        let navnInput = document.getElementById('navn' + i).value.trim();
        if (navnInput) {
            navn.push(navnInput);
        }
    }

    let antallLag = parseInt(document.getElementById('antallLag').value);

    if (navn.length < antallLag) {
        alert('Vennligst skriv inn minst like mange navn som antall lag.');
        return;
    }

    // Stokk navnene
    let stokket = navn.sort(() => 0.5 - Math.random());
    
    // Fordel navnene til lagene
    let lag = [];
    for (let i = 0; i < antallLag; i++) {
        lag.push([]);
    }

    for (let i = 0; i < stokket.length; i++) {
        lag[i % antallLag].push(stokket[i]);
    }

    // Vis lagene
    let lagListe = document.getElementById('lagListe');
    lagListe.innerHTML = ''; // Tøm tidligere resultater

    for (let i = 0; i < lag.length; i++) {
        let lagNavn = 'Lag ' + (i + 1) + ': ' + lag[i].join(', ');
        let p = document.createElement('p');
        p.innerText = lagNavn;
        lagListe.appendChild(p);
    }
});
