const socket = io();

const query = new URLSearchParams(location.search);
//http://localhost:4000/chat.html?username=misung&room=misungs+room
const username = query.get('username');
//username=misung
const room = query.get('room');
//room=misungs+room

socket.emit('join', { username, room }, (error) => {
    if(error) {
        alert(error);
        location.href = '/';
    }

});

const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;

socket.on('roomData', ({ room, users }) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })

    document.querySelector('#sidebar').innerHTML = html;
})

const messages = document.querySelector('#messages');
const messageTemplate = document.querySelector('#message-template').innerHTML;
//메세지 받아주는 부분
socket.on('message', (message) => {
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    })

    //출력메세지 위로 쌓기
    messages.insertAdjacentHTML('beforeend', html);
    scrollToBottom();
})

function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
}


const messageForm = document.querySelector('#message-form');
const messageFormInput = messageForm.querySelector('input');
const messageFormButton = messageForm.querySelector('button');

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageFormButton.setAttribute('disabled', 'disabled');

    const message = e.target.elements.message.value;

    socket.emit('sendMessage', message, (error) => {
        messageFormButton.removeAttribute('disabled');
        messageFormInput.value = ''; // 한번 전송후 인풋칸 비우기
        messageFormInput.focus();

        if(error) {
            return console.error(error);
        }
    })
})