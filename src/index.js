const express = require('express');
const app = express();

const http = require('http');
const path = require('path');
const server = http.createServer(app);
const { Server } = require('socket.io');
const { addUser, getUsersInRoom, getUser, removeUser } = require('./utils/users');
const { generateMessage } = require('./utils/messages');
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('socket', socket.id);

    socket.on('join', (options, callback) => {
        const { error, user } = addUser({ id : socket.id, ...options })

        if(error) {
            return callback(error);
        }

        //user.room에 소켓이 들어감
        socket.join(user.room);

        socket.emit('message', generateMessage('Admin', `${user.room} 채팅방에 오신걸 환영합니다.`));
        socket.broadcast.to(user.room).emit('message',generateMessage('Admin',`${user.username}님이 참여했습니다.`));

        io.to(user.room).emit('roomData', {
            room : user.room,
            users: getUsersInRoom(user.room)
        })

    });

    socket.on('sendMessage', (message, callback) => {

        const user = getUser(socket.id);

        //room에 있는 모든 사람들에게 메세지 전송
        io.to(user.room).emit('message', generateMessage(user.username, message));
        callback();
    });

    //유저가 room에서 나갔을때
    socket.on('disconnect', () => {
        console.log('socket disconnected', socket.id);
        const user = removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('message',generateMessage('Admin', `${user.username}님이 방을 나갔습니다.`));
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    });
})

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath));

const port = 4000;
server.listen(port, () =>{
    console.log(`Server is up on port ${port}`);
})