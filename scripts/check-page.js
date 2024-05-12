const validRoutes = ['/index.html', '/cadastro-usuario.html', '/cameras.html', '/central.html'];

function checkRoute() {
    const currentPath = window.location.pathname;
    if (!validRoutes.includes(currentPath)) {
        redirectToNotFound();
    }
}

function redirectToNotFound() {
    window.location.href = '/not-found.html';
}