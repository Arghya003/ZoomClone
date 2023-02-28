const express= require("express");

const app =express();

const server=require('http').Server(app)
const io = require("socket.io")(server);



const {v4: uuidv4}=require('uuid');


//middlewares
app.set("view engine",'ejs');

app.use(express.static('public'))

app.get('/',(req,res)=>{
   res.redirect(`/${uuidv4()}`)

})

app.get('/:room',(req,res)=>{
    res.render('room',{roomId:req.params.room})
})

io.on('connection', socket => {
  socket.on('join-room', (ROOM_ID) => {
    socket.join(R)
    //socket.to(roomId).broadcast.emit('user-connected');
    const broadcast = socket.to(roomId).broadcast;
    if (broadcast) {
      // Emit the user-connected event to all clients except the current one
      broadcast.emit("user-connected");
    } else {
      console.error("Error: broadcast object is undefined");
    }

  })
})









const PORT=5000|| process.env.PORT;
server.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})