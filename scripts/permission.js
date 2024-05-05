window.onload = () => {
    controlPermission();
};

function getPermissionProfile() {
    let cookies = cookiesToObject();
    return cookies.profile;
}

function controlPermission() {
    let selectAdmin = document.getElementById('admin_selection');
    let dashboardAdminAndCentral = document.getElementsByClassName('dashboard');
    let registerUserAdmin = document.getElementById('registerUserAdmin');

    if(getPermissionProfile() === 'SUPORTE') {
        registerUserAdmin.style.display = 'none';
        selectAdmin.style.display = 'none';
        for (var i = 0; i < dashboardAdminAndCentral.length; i++) {
            dashboardAdminAndCentral[i].style.display = 'none';
        }
    }
    else if(getPermissionProfile() === 'CENTRAL') {
        selectAdmin.style.display = 'none';
        registerUserAdmin.style.display = 'none';
    }
}

