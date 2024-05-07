window.addEventListener('load', () => {
    setInterval(getHourCurrent, 1000);
    getDateCurrent();
})

function getHourCurrent() {
    let currentHour = new Date();
    const formatHour = currentHour.toLocaleTimeString();
    document.getElementById('hourCurrent').textContent = formatHour;
}

function getDateCurrent() {
    let currentHour = new Date();
    let format = {
        weekday: 'long',
        day: 'numeric', 
        month: 'long',     
        year: 'numeric'    
    };

    let dateFormated = currentHour.toLocaleDateString('pt-BR', format);

    function capitalizar(texto) {
        return dateFormated.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    }

    // Aplicando a capitalização
    dateFormated = capitalizar(dateFormated);

    // Para incluir o separador "|"
    dateFormated = dateFormated.replace(',', ' |');

    document.getElementById('dateCurrent').textContent = dateFormated;
}

