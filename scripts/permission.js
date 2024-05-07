window.addEventListener('load', () => {
    getPermissionProfile();

    controlPermission();

    document.getElementById('logout').addEventListener('click', () => {
        logout();
    })
})

function cookiesToObject() {
    let cookies = document.cookie.split(';');
    let cookieObj = {};

    cookies.forEach(function(cookie) {
        let parts = cookie.split('=');
        let key = parts[0].trim();
        let value = decodeURIComponent(parts[1]);

        cookieObj[key] = value;
    });

    return cookieObj;
}

function getPermissionProfile() {
    let cookies = cookiesToObject();
    return cookies.profile;
}

function controlPermission() {
    let selectAdmin = document.getElementById('admin_selection');
    let dashboardAdminAndCentral = document.getElementsByClassName('dashboard');
    let registerUserAdmin = document.getElementById('registerUserAdmin');
    let controlCamAdmin = document.getElementById('controlCamAdmin');
    let adminBtnCall = document.getElementById('admin_btn_call');
    let camPrincipal = document.getElementById('cam-principal');

    if(getPermissionProfile() === 'SUPPORT') {
        if(window.location.pathname !== '/central.html') {
            window.location.pathname = '/central.html';
        }
        else {
            registerUserAdmin.style.display = 'none';
            controlCamAdmin.style.display = 'none';
            adminBtnCall.style.display = 'none';
            selectAdmin.style.display = 'none';
            camPrincipal.style.display = 'none';
            for (var i = 0; i < dashboardAdminAndCentral.length; i++) {
                dashboardAdminAndCentral[i].style.display = 'none';
            }
        }
    }
    else if(getPermissionProfile() === 'CENTRAL') {
        if(window.location.pathname === '/cadastro-usuario.html') {
            window.location.pathname = '/central.html';
        }
        registerUserAdmin.style.display = 'none';
        selectAdmin.style.display = 'none';
    }
    else if(getPermissionProfile() === '') {
        window.location.pathname = '/index.html';
    }
    else if(getPermissionProfile() !== 'CENTRAL' &&
    getPermissionProfile() !== 'SUPPORT' && 
    getPermissionProfile() !== 'ADMIN') {
        window.location.pathname = '/index.html';
    }
}

function createPermission() {
    let profile = document.cookie = 'profile=ADMIN';
    return profile;
}

function logout() {
    document.cookie = 'profile=';
    window.location.pathname = '/index.html';
}