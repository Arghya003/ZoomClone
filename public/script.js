const socket=io('/')

const videoGrid=document.getElementById('video-grid')
let myvideoStream;
const myvideo=document.createElement('video')
myvideo.muted=true;


var peer= new Peer(undefined,{
    path:'/peerjs',
    host:'/',
    port: 5000
})



navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true,
}).then(stream=>{
    myvideoStream=stream;
    addVideoStream(myvideo,stream)

}).catch(err=>{
    console.log(err)
})



peer.on('open',id=>{
   socket.emit("join-room", ROOM_ID,id);
})





socket.on('user-connected',(userId)=>{
    connectToNewUser(userId)
})

const connectToNewUser=(userId)=>{
    console.log(userId)

}



const addVideoStream=(video,stream)=>{
    video.srcObject= stream;
    video.addEventListener('loadedmetadata',()=>{
        video.play()
    })
    videoGrid.append(video)

}