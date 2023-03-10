const express= require("express");

const app =express();

const server=require('http').Server(app)
const io = require("socket.io")(server);
const {v4: uuidv4}=require('uuid');

const {ExpressPeerServer}=require('peer');

const peerServer=ExpressPeerServer(server,{
    debug:true
});


//middlewares
app.set("view engine",'ejs');

app.use(express.static('public'))
app.use('/peerjs',peerServer)






//routes
app.get('/',(req,res)=>{
   res.redirect(`/${uuidv4()}`)

})

app.get('/:room',(req,res)=>{
    res.render('room',{roomId:req.params.room})
})

io.on('connection',socket=>{
    socket.on('join-room',(roomId,userId)=>{
        //console.log('joined room')
        socket.join(roomId)
        socket.to(roomId).emit('user-connected',userId)
    })
})







const PORT=5000|| process.env.PORT;
server.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})