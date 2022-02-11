const socket = io('/');
let videoGrid = document.getElementById('video-grid');
const myPeer = new Peer(undefined, {
    host: '/',
    port: '3001',
});

const myVideo = document.createElement('video');
myVideo.muted = true;

navigator.mediaDevices
    .getUserMedia({
        video: true,
        audio: true,
    })
    .then((stream) => {
        addVideoStream(myVideo, stream);
    });

myPeer.on('open', (id) => {
    socket.emit('join-room', ROOM_ID, 10);
});

socket.on('user-connected', (userId) => {
    console.log(userId);
});

async function addVideoStream(video, stream) {
    videoGrid = await document.getElementById('video-grid');

    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
    console.log(videoGrid);
    videoGrid.append(video);
}
