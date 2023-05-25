

function handleSubmit(event) {
    event.preventDefault();
    updateDate();
    updateTime();

    localStorage.setItem('entrada', timeString);

    fetch("https://api.sheetmonkey.io/form/5CPujYT8YuoeVfAH2Luerx", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                nome: 'Carlão',
                dia: dateString,
                entrada: timeString,
                saida: ""
            }
        )

    })
}

function handleSubmitSaida(event) {
    event.preventDefault();
    updateDate();
    updateTime();
    let saidaData = "";
    
    let entradaValue = localStorage.getItem('entrada');

    saidaData = timeString;

    fetch("https://api.sheetmonkey.io/form/5CPujYT8YuoeVfAH2Luerx", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
                nome: 'Carlão',
                dia: dateString,
                entrada: entradaValue,
                saida: saidaData
            }
        )

    })
}


document.getElementById("formEntrada").addEventListener('submit', handleSubmit);



document.getElementById('formSaida').addEventListener('submit', handleSubmitSaida);