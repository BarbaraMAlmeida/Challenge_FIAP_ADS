let permission;

window.addEventListener('load', () => {
    document.cookie = 'profile=';

    document.getElementById('login').addEventListener('click', () => {
        formControlLogin();
    });
})

function formControlLogin() {
    if(validForm()) {
        permission = document.getElementById('perfil_selection').value;
        createPermission(permission);
    }
    else {
        alert('Preencha todos os campos!');
    }

}

function validForm() {
    const permissionSelect = document.getElementById('perfil_selection').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password || !permissionSelect ) {
        return false;
    } else {
        return true;
    }
    
}

function clearFormValues() {
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
}

function createPermission(permission) {
    switch (permission) {
        case 'Administrador':
        document.cookie = 'profile=ADMIN';
        window.location.pathname = '/central.html';
        break;
        case 'Central':
        document.cookie = 'profile=CENTRAL'; 
        window.location.pathname = '/central.html';
        break;
        case 'Suporte':
        document.cookie = 'profile=SUPPORT'; 
        window.location.pathname = '/central.html';
        break;
        default:
        alert("Permissão não disponível")
        break;
    }

    clearFormValues();
}