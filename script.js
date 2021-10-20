// clé OpenWeatherMap : 22b86141be75f2a86c6723c30425b89e

function recevoirTemperature(ville) {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=22b86141be75f2a86c6723c30425b89e&units=metric';
    let requete = new XMLHttpRequest();
    requete.open('GET', url);
    requete.responseType = 'json';
    requete.send();

    requete.onload = function() {
        if(requete.readyState === XMLHttpRequest.DONE) {
            if(requete.status === 200) {
                let reponse     = requete.response;
                let temperature = reponse.main.temp;
                let ville       = reponse.name;
                document.querySelector('#ville').textContent = ville;
                document.querySelector('#temperature').textContent = temperature;
            }else {
                alert('Un problème est intervenu, merci de revenir plus tard');
            }
        }
    }
}

let bouton_changer_de_ville = document.querySelector('#bouton_changer_de_ville');
let villeParDefaut;

if('geolocation' in navigator) {
    navigator.geolocation.watchPosition((position) => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
    });
}else {
    villeParDefaut = 'Paris';
    recevoirTemperature(villeParDefaut);
}

bouton_changer_de_ville.addEventListener('click', () => {
    let villeChoisie = prompt('Veuillez entrer la ville :\n\n');
    recevoirTemperature(villeChoisie);
});


