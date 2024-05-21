let permission;
window.addEventListener('load', () => {
    localStorage.setItem('profile', '');
    document.getElementById('login').addEventListener('click', () => {
        formControlLogin();
    });
})

function formControlLogin() {
    if (validForm()) {
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

    if (!email || !password || !permissionSelect) {
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
    let profile = ""
    switch (permission) {
        case 'Administrador':
            profile = "ADMIN"
            break;
        case 'Central':
            profile = "CENTRAL"
            break;
        case 'Suporte':
            profile = "SUPPORT"
            break;
        default:
            alert("Permissão não disponível")
            return
    }

    localStorage.setItem('profile', profile);
    window.location.href = './central.html';

    clearFormValues();
}