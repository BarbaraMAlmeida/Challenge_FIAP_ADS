window.onload = () => {
    controlPermission();
    let spinnerDashboard = document.getElementById('spinner-dashboard');
    let dashboard = document.getElementById('dashboard');

    setTimeout(() => {
        spinnerDashboard.classList.add('visually-hidden');
        dashboard.classList.remove('visually-hidden');
        getValueCards();
        addGradientCardFailed();

        document.getElementById('saveCall').addEventListener('click', () => {
            formControlRegisterCall();
        });

        document.getElementById('cancelCall').addEventListener('click', () => {
            clearCallFormValues();
        });
    
    }, 500);
   
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

function addGradientCardFailed() {
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
                Array.from(loading).forEach(function(element) {
                    element.classList.add('visually-hidden');
                });
                toastBootstrap.show()
                setTimeout(() => {
                    toastBootstrap.hide()
                    modalInstance.hide();
                }, 1000);
            }, 1000);
        }
    }
    else {
        alert('Preencha todos os campos!');
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

function clearCallFormValues() {
    document.getElementById('callName').value = '';
    document.getElementById('equipment').value = '';
    document.getElementById('nEquipment').value = '';
    document.getElementById('toll').value = '';
    document.getElementById('status').value = '';
    document.getElementById('priority').value = '';
    document.getElementById('description').value = '';
}