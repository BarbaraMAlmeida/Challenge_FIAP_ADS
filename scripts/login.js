let links;
let permission;

window.addEventListener('load', () => {
    document.cookie = 'profile=';
    links = document.querySelectorAll('.nav-link');

    links.forEach(link => {
        link.addEventListener('click', function() {

            links.forEach(l => {
                l.classList.remove('active');
            });

            this.classList.add('active');
        });
    });

    document.getElementById('login').addEventListener('click', () => {
        formControlLogin();
    });
})

function formControlLogin() {
    if(validForm()) {
        links.forEach(link => {
            if(link.classList.contains('active')) {
                permission = link.innerHTML;
            }
        })
        createPermission(permission);
    }
    else {
        alert('Preencha todos os campos!');
    }

}

function validForm() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
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