window.addEventListener('load', () => {
    let spinnerDashboard = document.getElementById('spinner-dashboard');
    let dashboard = document.getElementById('dashboard');

    setTimeout(() => {
        spinnerDashboard.classList.add('visually-hidden');
        dashboard.classList.remove('visually-hidden');
        controlInfravermelhoAtNight();
    }, 200);
})

function controlInfravermelhoAtNight() {
    let cameras = document.getElementsByTagName('video');
    let currentHour = new Date();
    const formatHour = currentHour.toLocaleTimeString();

    if(formatHour >= '18:30:00') {
        for (var i = 0; i < cameras.length; i++) {
            cameras[i].classList.add('infravermelho');
        }
    }
}
