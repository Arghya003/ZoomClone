const socket=io('/')

const videoGrid=document.getElementById('video-grid')

let myvideoStream;


const myvideo=document.createElement('video')

myvideo.muted=true,

navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true,
}).then(stream=>{
    myvideoStream=stream;
    addVideoStream(myvideo,stream)

}).catch(err=>{
    console.log(err)
})

socket.emit('join-room',ROOM_ID)

socket.on('user-connected',()=>{
    connectToNewUser()
})

const connectToNewUser=(ROOM_ID)=>{
    console.log('new user')

}



const addVideoStream=(video,stream)=>{
    video.srcObject= stream;
    video.addEventListener('loadedmetadata',()=>{
        video.play()
    })
    videoGrid.append(video)

}