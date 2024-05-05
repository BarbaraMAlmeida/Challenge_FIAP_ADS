window.onload = () => {
    setInterval(getHourCurrent, 1000);
    getDateCurrent();
    getValueCards();
    localePortico();
    AddGradientCardFailed();


    ///isso é da tela de cadastro de usuario, levar para lá
    // document.getElementById('save').addEventListener('click', () => {
    //     console.log("click")
    //     formControlRegisterUser();
    // });

    // document.getElementById('cancel').addEventListener('click', () => {
    //     clearFormValues();
    // });

    document.getElementById('saveCall').addEventListener('click', () => {
        formControlRegisterCall();
    });

    document.getElementById('cancelCall').addEventListener('click', () => {
        clearCallFormValues();
    });
   
}




function getValueCards() {
    let listCardProgress = document.getElementsByClassName('progress-bar');
    for (var i = 0; i < listCardProgress.length; i++) {
        let width = parseFloat(getComputedStyle(listCardProgress[i]).getPropertyValue('--progress-width'));
        if (width <= 20) {
            listCardProgress[i].classList.add("bg-danger");
        } else if (width > 20 && width <= 30) {
            listCardProgress[i].classList.add("bg-warning");
        } else if (width > 30 && width <= 60) {
            listCardProgress[i].classList.add("bg-info");
        } else if (width > 60 && width <= 90) {
            listCardProgress[i].classList.add("bg-god");
        } else {
            listCardProgress[i].classList.add("bg-success");
        }
    }
}

function AddGradientCardFailed() {
    let listCardFailed = document.getElementsByClassName('danger-tag');
    for (var i = 0; i < listCardFailed.length; i++) {
        if(listCardFailed[i].innerHTML.trim() === 'Falha') {
            let cardItem = listCardFailed[i].closest('.card-dashboard-item');
            if(cardItem) {
                cardItem.classList.add('animated-gradient')
            }
        }
    }
}


function toastRegistrerSuccess() {
    const toastTrigger = document.getElementById('save')
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

function formControlRegisterUser() {
    if(validForm()) {
        let buttonSaveUser = document.getElementById('save');
        const toastLiveExample = document.getElementById('liveToast')
    
        if (buttonSaveUser) {
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            toastBootstrap.show()

            setTimeout(() => {
                clearFormValues();
            }, 1000);
        }
    }
    else {
        alert('Preencha todos os campos!');
    }

}


function formControlRegisterCall() {
    var modalElement = document.getElementById('modalChamado');
    var modalInstance = bootstrap.Modal.getInstance(modalElement);
    if(validCallForm()) {
        let buttonSaveCall = document.getElementById('saveCall');
        const toastLiveExample = document.getElementById('liveToast')
    
        if (buttonSaveCall) {
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
            let loading = document.getElementsByClassName('spinner-border');
            Array.from(loading).forEach(function(element) {
                element.classList.remove('visually-hidden');
            });
            setTimeout(() => {
                clearCallFormValues();
                loading[0].classList.add('visually-hidden');
                toastBootstrap.show()
                setTimeout(() => {
                    toastBootstrap.hide()
                    modalInstance.hide();
                }, 1000);
            }, 3000);
        }
    }
    else {
        alert('Preencha todos os campos!');
    }

}

function validForm() {
    const userName = document.getElementById('userName').value.trim();
    const sector = document.getElementById('sector').value.trim();
    const permission = document.getElementById('permission').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!userName || !sector || !permission || !email || !password) {
        return false;
    } else {
        return true;
    }
    
}

function validCallForm() {
    const callName = document.getElementById('callName').value.trim();
    const equipment = document.getElementById('equipment').value.trim();
    const nEquipment = document.getElementById('nEquipment').value.trim();
    const toll = document.getElementById('toll').value.trim();
    const status = document.getElementById('status').value.trim();
    const priority = document.getElementById('priority').value.trim();
    const description = document.getElementById('description').value.trim();

    if (!callName || !equipment || !nEquipment || !toll || !status || !priority || !description) {
        return false;
    } else {
        return true;
    }
    
}

function clearFormValues() {
    document.getElementById('userName').value = '';
    document.getElementById('sector').value = '';
    document.getElementById('permission').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
}

function clearCallFormValues() {
    document.getElementById('callName').value = '';
    document.getElementById('equipment').value = '';
    document.getElementById('nEquipment').value = '';
    document.getElementById('toll').value = '';
    document.getElementById('status').value = '';
    document.getElementById('priority').value = '';
    document.getElementById('description').value = '';
}

function getHourCurrent() {
    let currentHour = new Date();
    const formatHour = currentHour.toLocaleTimeString();
    document.getElementById('hourCurrent').textContent = formatHour;
}

function getDateCurrent() {
    let currentHour = new Date();
    let format = {
        weekday: 'long',
        day: 'numeric', 
        month: 'long',     
        year: 'numeric'    
    };

    let dateFormated = currentHour.toLocaleDateString('pt-BR', format);

    function capitalizar(texto) {
        return dateFormated.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    }

    // Aplicando a capitalização
    dateFormated = capitalizar(dateFormated);

    // Para incluir o separador "|"
    dateFormated = dateFormated.replace(',', ' |');

    document.getElementById('dateCurrent').textContent = dateFormated;
}


