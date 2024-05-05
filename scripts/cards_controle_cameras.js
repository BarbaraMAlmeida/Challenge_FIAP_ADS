window.onload = () => {
    getValueCards();
    toastRegistrerSuccess();
    localePortico();
};


function getValueCards() {
    let listCardProgress = document.getElementsByClassName('progress-bar');
    console.log(listCardProgress)
    for (var i = 0; i < listCardProgress.length; i++) {
        let width = parseFloat(listCardProgress[i].style.width);
        if (width <= 20) {
            listCardProgress[i].classList.add("bg-danger");
        } else if (width > 20 && width <= 30) {
            listCardProgress[i].classList.add("bg-warning");
        } else if (width > 30 && width <= 60) {
            listCardProgress[i].classList.add("bg-info");
        }
        else if (width > 60 && width <= 90) {
            listCardProgress[i].classList.add("bg-god");
        } else {
            listCardProgress[i].classList.add("bg-success");
        }
    }
}

function toastRegistrerSuccess() {
    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')

    if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastTrigger.addEventListener('click', () => {
        toastBootstrap.show()
    })
    }
}

function localePortico() {
    var endereco = "Rod. Fernão Dias, Km 596 (BR-381)";
    var chaveAPI = "AIzaSyDX4YxVrzcjIC1JIIGYOkjhTOyaS-NeuS4";
    
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(endereco) + '&key=' + chaveAPI)
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao obter as coordenadas: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        if (data.status !== 'OK' || !data.results || data.results.length === 0 || !data.results[0].geometry || !data.results[0].geometry.location) {
            throw new Error('Erro ao obter as coordenadas: Resposta inválida');
        }
        
        var latitude = data.results[0].geometry.location.lat;
        var longitude = data.results[0].geometry.location.lng;
        
        // Faça o que quiser com as coordenadas (latitude e longitude)
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);
    })
    .catch(error => console.error('Erro ao obter as coordenadas:', error));
    
    
}

