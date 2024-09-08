const express = require('express')
const cors = require('cors')
const app = express()
const { Server } = require('socket.io');


const {createServer} = require('http')

const server = createServer(app)
const {router} = require('./routes/routes')

const io = new Server(server,{cors: {
  origin: 'http://localhost:3001',

}})


app.use(cors())
app.use(express.json())
// app.use('/', router)


  server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
  });

  io.on('connection', (socket) => {
    console.log('a user connected with id: ', socket.id);
    let userID = socket.id

        socket.on("sendMsg", (data)=>{
          console.log(data)
                // io.emit("revieveMsg",data)
                socket.broadcast.emit("revieveMsg",data)
        })
  });

