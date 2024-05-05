window.onload = () => {
    controlPermission();
};

function getPermissionProfile() {
    let cookies = cookiesToObject();
    return cookies.profile;
}

function controlPermission() {
    var selectAdmin = document.getElementById('admin_selection');
    var dashboardAdminAndCentral = document.getElementsByClassName('dashboard');

    if(getPermissionProfile() === 'SUPORTE') {
        selectAdmin.style.display = 'none';
        for (var i = 0; i < dashboardAdminAndCentral.length; i++) {
            dashboardAdminAndCentral[i].style.display = 'none';
        }
    }
    else if(getPermissionProfile() === 'CENTRAL') {
        selectAdmin.style.display = 'none';
    }
}

