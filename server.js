const express = require('express');
const http = require('http');
const { v4: uuidV4 } = require('uuid');
const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect(`/${uuidV4()}`);
});

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room });
});

server.listen(3000, () => {
    console.log('Server is running!');
});
io.on('connection', (socket) => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        socket.broadcast.emit('user-connected', userId);
    });
});
