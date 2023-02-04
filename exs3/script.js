const btn = document.querySelector('#btn_echo');
const btngeo = document.querySelector('#btn_geo')
const wsUrl ="wss://echo-ws-service.herokuapp.com/";
let websocket;
let row;

// Открываем соединение
// Надо подумать чтобы соединение открывалось при нажатии кнопки
websocket = new WebSocket(wsUrl);
    websocket.onopen =function(evt){
        console.log('открыли соединение')
    };

websocket.onmessage = function(evt){
    insertMessage('start', evt.data)

};


websocket.onclose = function(evt){
    console.log("Конец")
};



// Отправки сообщения на сервер и обработка ответа
btn.addEventListener('click', ()=>{
    message = document.querySelector('#input').value;
    insertMessage('end', message);
    websocket.send(message)
});


// Создаем div с сообщением и вставлем в текст
function insertMessage(column, message){
    let capt = document.createElement('div');
    capt.width = 500;
    capt.style.display = 'flex';
    capt.style.justifyContent = column;
    let captin = document.createElement('div');
    captin.textContent = message;
    captin.style.display = 'flex';
    captin.style.flexWrap = 'wrap';
    captin.className = 'mess'
    capt.append(captin)
    document.getElementById('output').append(capt)

}
// Блок по геолокации
const error = () => {
    status.textContent('Невозможно получить геолокацию')
}

const success = (position) => {
    insertMessage('end', 'Гео-локация')
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    mapLink = document.createElement('a');
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = 'Ваша гео-локация';
    geocapt = document.createElement('div');
    geocapt.className = 'geo';
    geocapt.append(mapLink)
    document.getElementById('output').append(geocapt);
}

btngeo.addEventListener('click', ()=>{
    if (!navigator.geolocation) {
        status.textContent='Геолокация не поддерживается браузером'
    } else {
        status.textContent='Определение местоположения';
        navigator.geolocation.getCurrentPosition(success, error);
    }

});


// Отображение отправленных сообщений
function displayOurMess(message){
    win = document.createElement('div');
    win.className = '.ourmess';
    win.textContent = message;
    document.getElementById('output').append(win);
};


// Отобразить ЭХО
function displayEcho(message){
    console.log('Эхо')
};

// Отобразить геолокацию
function displayGeo(){
    console.log('геолокация')
}





