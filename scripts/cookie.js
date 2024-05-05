function cookiesToObject() {
    let cookies = document.cookie.split(';');
    let cookieObj = {};

    cookies.forEach(function(cookie) {
        let parts = cookie.split('=');
        let key = parts[0].trim();
        let value = decodeURIComponent(parts[1]);

        // Armazena o par chave-valor no objeto
        cookieObj[key] = value;
    });

    return cookieObj;
}