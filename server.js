var express = require("express");
var bodyParser = require('body-parser');
const { Socket } = require("socket.io");
var app = express()

var http = require('http').Server(app);
var io = require('socket.io')(http)

var mongoose = require('mongoose');
const { stringify } = require("querystring");
const { sendStatus } = require("express/lib/response");

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

var dbUrl = 'mongodb+srv://user:user@cluster0.ibokm.mongodb.net/?retryWrites=true&w=majority'

var Message = mongoose.model('Message',{
    name: String,
    message: String
})

app.get('/messages', (req, res) =>{
    Message.find({},(err, messages)=>{
        res.send(messages)
    })
})
app.post('/messages', (req, res) =>{
    var message = new Message(req.body)

    message.save((err) =>{
        if(err){
            sendStatus(500)
        }
        // messages.push(req.body)
        //call back hell
        Message.findOne({message: 'badword'}, (err, censored) =>{
            if(censored){
                console.log('censored word -------')
                Message.remove({_id:censored.id})
            }
        })
        io.emit('message',req.body)
        res.sendStatus(200);
    })
    console.log(message)
})

io.on('connection', (socket) =>{
    console.log('user connected');
})
mongoose.connect(dbUrl, (err) =>{
    console.log("mongo db collection", err)
})
const server = http.listen(3000, () =>{
    console.log("server is listinging on port :-", server.address().port)
})