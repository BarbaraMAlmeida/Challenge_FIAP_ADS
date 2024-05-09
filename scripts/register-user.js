window.onload = () => {
    controlPermission();
    let spinner = document.getElementById('spinner');
    setTimeout(() => {
        document.getElementById('save').addEventListener('click', () => {
            formControlRegisterUser();
        });

        document.getElementById('cancel').addEventListener('click', () => {
            clearFormValues();
        });

    }, 500);
   
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

function formControlRegisterUser() {
    if(validForm()) {
        spinner.classList.remove('visually-hidden');
        let buttonSaveUser = document.getElementById('save');
        const toastLiveExample = document.getElementById('liveToast')
    
        if (buttonSaveUser) {
            const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)

            setTimeout(() => {
                toastBootstrap.show()
                clearFormValues();
                spinner.classList.add('visually-hidden');
            }, 1000);
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

function clearFormValues() {
    document.getElementById('userName').value = '';
    document.getElementById('sector').value = '';
    document.getElementById('permission').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
}