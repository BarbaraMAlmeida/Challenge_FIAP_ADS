window.addEventListener('load', () => {
    getPermissionProfile();

    controlPermission();

    document.getElementById('logout').addEventListener('click', () => {
        logout();
    })
})

function getPermissionProfile() {
    return localStorage.getItem('profile');
}

function controlPermission() {
    let selectAdmin = document.getElementById('admin_selection');
    let dashboardAdminAndCentral = document.getElementsByClassName('dashboard');
    let registerUserAdmin = document.getElementById('registerUserAdmin');
    let controlCamAdmin = document.getElementById('controlCamAdmin');
    let adminBtnCall = document.getElementById('admin_btn_call');
    let camPrincipal = document.getElementById('cam-principal');

    if (getPermissionProfile() === 'SUPPORT') {
        if (!window.location.pathname.includes('central.html')) {
            window.location.href = './central.html';
        }

        registerUserAdmin.style.display = 'none';
        controlCamAdmin.style.display = 'none';
        adminBtnCall.style.display = 'none';
        selectAdmin.style.display = 'none';
        camPrincipal.style.display = 'none';
        for (var i = 0; i < dashboardAdminAndCentral.length; i++) {
            dashboardAdminAndCentral[i].style.display = 'none';
        }

    }
    else if (getPermissionProfile() === 'CENTRAL') {
        if (window.location.pathname.includes('cadastro-usuario.html')) {
            window.location.href = './central.html';
        }
        registerUserAdmin.style.display = 'none';
        selectAdmin.style.display = 'none';
    }
    else if (getPermissionProfile() !== 'CENTRAL' &&
        getPermissionProfile() !== 'SUPPORT' &&
        getPermissionProfile() !== 'ADMIN') {
        window.location.href = './index.html';
    }
}

function logout() {
    localStorage.setItem('profile', '');
    window.location.href = './index.html';
}