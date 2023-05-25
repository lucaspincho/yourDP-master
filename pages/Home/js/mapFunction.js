let map = document.getElementById("map")

// import LOCAL_COMPANY from './js/localCompany.js'

// Verifica se o navegador suporta a API Geolocation

if (navigator.geolocation) {
    // Chama a função getCurrentPosition para obter a localização do usuário
    navigator.geolocation.getCurrentPosition(function (position) {
        // Pega a latitude e longitude da posição
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        var mymap = L.map(map, { zoomControl: false, attributionControl: false }).setView([latitude, longitude], 13);
        console.log(latitude)
        console.log(longitude)
        // Adicione uma camada de mapa do OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            maxZoom: 18,
        }).addTo(mymap);

        // Adicione um marcador inicial
        var marker = L.marker([latitude, longitude]).addTo(mymap);

        // Adicione um evento de clique ao mapa para atualizar o marcador
        mymap.on('click', function (e) {
            marker.setLatLng(e.latlng);
            updateCoordinates(e.latlng.lat, e.latlng.lng);
        });

        // Compara localização 

        var fixedLocation = L.latLng(LOCAL_COMPANY.lat, LOCAL_COMPANY.long);
        var userLocation = L.latLng(latitude, longitude);

        if (fixedLocation.distanceTo(userLocation) <= 900) {
            // O usuário está dentro do raio de 100 metros do ponto fixo
            let userButton = document.getElementById("button_user");
            userButton.disabled = false;



        } else {
            //O usuário está fora do raio de 3000 metros do ponto fixo
            let userButton = document.getElementById("button_user");
            userButton.style.backgroundColor = "#a9a9a9"
            userButton.disabled = true;
            userButton.addEventListener("click", () => {
                var notyf = new Notyf();
                notyf.error('Você está fora da área da empresa');
            })


        }
    });
} else {
    // Caso o navegador não suporte a API Geolocation
    alert("Seu navegador não suporta Geolocation.");
}




