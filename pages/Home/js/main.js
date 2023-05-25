var dateString = ""
var timeString = ""

//TIME HOME 
function updateTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    timeString = hours + ":" + minutes;
    document.getElementById("clockContent").innerHTML = timeString;
    document.getElementById("clockContentModalEntrada").innerHTML = timeString;
    document.getElementById("clockContentModalSaida").innerHTML = timeString;
}



//DATE HOME

function updateDate() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;
    dateString = day + "/" + month + "/" + year;
    document.getElementById("dateContent").innerHTML = dateString;
    document.getElementById("dateContentModalEntrada").innerHTML = dateString;
    document.getElementById("dateContentModalSaida").innerHTML = dateString;
}

window.onload = function () {
    updateTime();
    updateDate();
    setInterval(updateTime, 1000);
    setInterval(updateDate, 86400000); // atualiza a data a cada 24 horas

};



//SAIDA CONFIG

// const saida = "22:28"

// updateTime();

// if(timeString !== saida) {
//     document.getElementById("saidaBtn").disabled = true;
// } else{
//     document.getElementById("saidaBtn").disabled = false;
// } 


//MODAL 

let btnPoint = document.getElementById("button_user");

btnPoint.addEventListener("click", () => {
    document.getElementById("modalPoint").classList.add("showModal");
})

let iconClose = document.getElementById("iconClose");

iconClose.addEventListener("click", () => {
    document.getElementById("modalPoint").classList.remove("showModal");
})


//NOTIFICATION

let btnEntrada = document.getElementById("button_userEntrada");

btnEntrada.addEventListener("click", () => {
    var notyf = new Notyf({
        position: {
            x: 'right',
            y: 'top',
        }
    });
    notyf.success('Ponto cadastrado');
})

let btnSaida = document.getElementById("button_userSaida");

btnSaida.addEventListener("click", () => {
    var notyf = new Notyf({
        position: {
            x: 'right',
            y: 'top',
        }
    });
    notyf.success('Ponto cadastrado');
})



//SAIDA BLOCK  

var currentTimeString = new Date().toLocaleTimeString('pt-BR', {hour12: false});


var minTimeString = "09:00:00"
var maxTimeString = "12:30:00";

if(currentTimeString >= minTimeString && currentTimeString <= maxTimeString){
    document.getElementById("button_userSaida").disabled = false;
    document.getElementById("button_userSaida").style.backgroundColor = "#2D1CC6"
} else {
    document.getElementById("button_userSaida").disabled = true;
    document.getElementById("button_userSaida").style.backgroundColor = "#a9a9a9"
    
}


//nameUser 

const nameUserData = USER_DATA.name; 

let spanHome = document.getElementById("nameUser").innerHTML = nameUserData;