let express = require("express");
let cors = require("cors");
var fileupload = require('express-fileupload');
require('dotenv').config();

let rooms = ['gerneral', 'queries', 'products'];
let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(fileupload());
require("./connection");

let server = require('http').createServer(app);
let PORT = process.env.PORT || 9000;


// let io = require('socket.io')(server, {
//     cors: {
//         origin: 'http://localhost:3000/',
//         methods: ['GET']
//     }
// });

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

let mongoose = require('mongoose');
let Message = require("./app/models/message.model");
let Users = require("./app/models/user.model");


// Routes for Earnser.
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Earnser application." });
});

require('./app/routes/auth')(app);
require('./app/routes/user')(app);
require('./app/routes/profile')(app);
require('./app/routes/query')(app);
require('./app/routes/comment')(app);
require('./app/routes/product')(app);
require('./app/routes/solutions')(app);
require('./app/routes/mail')(app)
app.get("/rooms", (req, res) => {
    res.json(rooms);
});

async function getLastMessagesFromRoom(room) {
    let roomMessage = await Message.aggregate([
        {$match: {to: room}},
        {$group: {_id: '$date', messagesByDate: {$push: '$$ROOT'}}},
    ])
    return roomMessage;
}

function sortingMsg(msgs) {
    return msgs.sort(function(a,b){
        let date1 = a._id.split('/');
        let date2 = b._id.split('/');

        date1 = date1[2] + date1[0] + date1[1]
        date2 = date2[2] + date2[0] + date2[1]

        return date1 < date2 ? -1 : 1
    })
}



 

// io.on('connection', (socket)=>{
//     socket.on('new-user',async () => {
//         let members = await Users.find();
//         io.emit('new-user', members)
//     })
    
    
//     socket.on('join-room',async (room) => {
//         socket.join(room)
//         let roomMessages = await getLastMessagesFromRoom(room);
//         roomMessages = sortingMsg(roomMessages);
//         socket.emit('room-messages', roomMessages)

//     })
// })
// set port, listen for requests
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}.`);
// });


