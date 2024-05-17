let listPayments = [
    {
        driver: "Estevão Araújo Boaventura",
        board: "NDX-7040",
        modelCar: "Toyota Corolla",
        ticketTime: "30/03/2024 15:20",
        debitTime: "30/03/2024 15:22",
        status: "Pago"
    },
    {
        driver: "Bárbara Nicolle M de Almeida",
        board: "BNS-1280",
        modelCar: "Toyota Corolla",
        ticketTime: "30/03/2024 15:20",
        debitTime: "30/03/2024 15:22",
        status: "Vencido"
    },
    {
        driver: "Giovanni de Souza Oliveira",
        board: "PWX-7040",
        modelCar: "Honda City",
        ticketTime: "31/03/2024 15:20",
        debitTime: "31/03/2024 15:22",
        status: "Boleto pendente"
    },
    {
        driver: "João Lucas Boaventura",
        board: "NMZ-7040",
        modelCar: "Toyota Corolla",
        ticketTime: "30/03/2024 15:20",
        debitTime: "30/03/2024 15:22",
        status: "Em processamento"
    },
    {
        driver: "Jaqueline Silva",
        board: "NDX-2345",
        modelCar: "Toyota Corolla",
        ticketTime: "30/03/2024 15:20",
        debitTime: "30/03/2024 15:22",
        status: "Em processamento"
    },
    {
        driver: "Gabriel Jesus",
        board: "NMX-7040",
        modelCar: "Ford Ka",
        ticketTime: "30/03/2024 15:20",
        debitTime: "30/03/2024 15:22",
        status: "Em processamento"
    }
];

let container = document.querySelector('.all-cards');

function filterPayments() {
    console.log("aaa")
    const filterDriver = document.getElementById('filterDriver').value;
    const filterPlate = document.getElementById('filterPlate').value;
    const filterStatus = document.getElementById('filterStatus').value;

    const filteredPayments = listPayments.filter(payment => {
        return (filterDriver === "" || payment.driver === filterDriver) &&
               (filterPlate === "" || payment.board === filterPlate) &&
               (filterStatus === "" || payment.status === filterStatus);
    });

    displayPayments(filteredPayments);
}

function getStatusClass(status) {
    switch(status) {
        case 'Pago': return 'success-tag';
        case 'Vencido': return 'danger-tag';
        case 'Boleto pendente': return 'warning-tag';
        case 'Em processamento': return 'info-tag';
        default: return 'default-tag';
    }
}

function displayPayments(payments) {
    const container = document.querySelector('.all-cards');
    container.innerHTML = ''; // Clear the container

    if (payments.length === 0) {
        container.innerHTML = '<p class="col-span-12 text-center">Não existe nenhum pagamento com essas informações.</p>';
    } else {
        payments.forEach(payment => {
            let statusClass = getStatusClass(payment.status);
            let card = document.createElement('div');
            card.className = 'card-dashboard-item col-span-4';
            let dropdownHTML = '';

            if (payment.status === 'Vencido' || payment.status === 'Boleto pendente') {
                let modalTarget = payment.status === 'Vencido' ? '#modalVencido' : '#modalPendente';
                dropdownHTML = `
                    <div class="dropdown">
                        <i class="dropdown-toggle fa-solid fa-ellipsis" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"></i>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li><button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="${modalTarget}">Ver detalhes</button></li>
                        </ul>
                    </div>`;
            }

            card.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <h5 class="title-card-payments d-flex align-items-center">
                        <i class="fa-solid fa-car"></i>
                        <span class="ms-2">${payment.driver}</span>
                    </h5>
                    ${dropdownHTML}
                </div>
                <div class="mt-2 d-flex align-items-center justify-content-between flex-wrap">
                    <div><span class="information">Placa:</span> <span class="value">${payment.board}</span></div>
                    <div><span class="information">Modelo:</span> <span class="value">${payment.modelCar}</span></div>
                </div>
                <div>
                    <div class="mt-2"><span class="information">Hora da passagem:</span> <span class="value">${payment.ticketTime}</span></div>
                    <div class="mt-2"><span class="information">Hora do débito:</span> <span class="value">${payment.debitTime}</span></div>
                </div>
                <div class="w-100 d-flex justify-content-end align-items-center">
                    <span class="${statusClass}">${payment.status}</span>
                </div>
            `;
            container.appendChild(card);
        });
    }
}