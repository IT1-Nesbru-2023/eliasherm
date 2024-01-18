
        function randomRange(tall1,tall2){
            let tilfeldigTall = Math.floor(Math.random()*(tall2-tall1) + tall1)
            document.write("Det tilfeldige tallet mellom "+tall1+" og "+tall2+" er: "+tilfeldigTall+"." )
            console.log("Elias")

        }
        randomRange(1,10)