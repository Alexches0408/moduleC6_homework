const btn = document.querySelector('#btn_echo');
const btngeo = document.querySelector('#btn_geo')
const wsUrl ="wss://echo-ws-service.herokuapp.com/";
let websocket;

// Открываем соединение
// Надо подумать чтобы соединение открывалось при нажатии кнопки
websocket = new WebSocket(wsUrl);
    websocket.onopen =function(evt){
        console.log('открыли соединение')
    };

websocket.onmessage = function(evt){
    console.log(evt.data)
};


websocket.onclose = function(evt){
    console.log("Конец")
    console.log(websocket)
};



// Отправки сообщения на сервер и обработка ответа
btn.addEventListener('click', ()=>{
    message = document.querySelector('#input').value;
    websocket.send(message)
});

// Блок по геолокации
const error = () => {
    status.textContent('Невозможно получить геолокацию')
}

const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    mapLink = document.createElement('a');
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = 'Ваша гео-локация';
    document.getElementById('output').append(mapLink);
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





