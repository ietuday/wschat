var WebSocket = require('ws');
var connections = {};
var application = require('./server_modules/app.js');

console.log('Starting ws Server');
var server = require('http').createServer()
, url = require('url')
, bodyParser = require('body-parser')
, ejs = require('ejs')
, express = require('express')
, app = express()
, port = 8080;
var WebSocketServer = WebSocket.Server;
var wss = new WebSocketServer({server: server});
wss.on('connection', function (connection) {
  onWsConnection(connection);
});
// var MongoClient = require('mongodb').MongoClient
//   , assert = require('assert');
// var url = 'mongodb://localhost:27017/ChatDB';
// Use connect method to connect to the server
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/ChatDB'
var db= require('mongodb').Db
app.use(express.static(__dirname + '/dist'));
app.set('views', __dirname + '/dist');
// Default for express is Jade as the rendering engine. Change that to EJS for HTML over JADE
app.engine('html', ejs.renderFile);

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({// to support URL-encoded bodies
  extended: true
}));    // onlineUser.connection = con;
// onlineUser.connection = con;


app.get('/', (req, res) => res.render('./dist/index.html'));

server.on('request', app);
server.listen(port, function () {
  console.log('Listening on ' + server.address().port)
  MongoClient.connect(  url, function(err, db) {
    assert.equal(null, err);
    db.collection('onlineUsers').drop();
    db.createCollection('onlineUsers',function(){
      console.log("New Collection created");
    })
  });
});

function onWsConnection(connection) {
  console.log("opened new connection");
  connection.on("close", function () {
    for (i in connections) {
      if (connections[i] == connection) {
        // console.log("i is printed",i);

        MongoClient.connect(url, function(err, db) {
          assert.equal(null, err);

          db.collection('onlineUsers').remove({ name : i},function(){
            console.log("Deleted from Database",i);
            db.collection('onlineUsers').find().toArray().then(function(data){
              console.log("Got onlineUers", data);
              var messageObject = {};
              messageObject.action='login';
              messageObject.message=data
              for (i in connections) {
                connections[i].send(JSON.stringify(messageObject));
              }
            })

          });
          //db.close();
        });
        delete connections[i];
      }
    }
    console.log("On close connection removed from connections.");

  });

  connection.on('message', function (message) {
    console.log("Received message", message);
    onMessage(connection, message);
  });
}

function onMessage(con, message) {
  console.log('message onMessage', message);
  var messageObject = JSON.parse(message);
  switch (messageObject.action) {
    case 'login':
    application.login(con,messageObject);
    break;

    case 'chat':
    application.chat(con,messageObject);
    break;

    case 'chatHistory':
    application.chatHistory(con,messageObject);
    default:

  }
}
