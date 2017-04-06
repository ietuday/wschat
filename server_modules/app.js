
var connections={};
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/ChatDB'
var db= require('mongodb').Db;

exports.login=function login(con, messageObject) {
  var onlineUser = JSON.parse(messageObject.message);
  connections[onlineUser.name] = con;

  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    db.collection('onlineUsers').insert(onlineUser,{},function(err, result){
      assert.equal(err, null);
      console.log("Inserted obj in onlineUsers", result);
      // db.collections('onlineUsers').find({ name: })
      db.collection('onlineUsers').find().toArray().then(function(data){
        console.log("Got onlineUers", data);

        for (i in connections) {
          messageObject.message = data;
          connections[i].send(JSON.stringify(messageObject));
        }
      });
      // db.close();
    })
  });
}

exports.chat=function chat(con, messageObject){
  var chatData = JSON.parse(messageObject.message);

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    db.collection('chatHistory').insert(chatData,{},function(err, result){
      assert.equal(err, null);
      console.log("Inserted obj in chatHistory", result);
      db.collection('chatHistory').find().toArray().then(function(data){
        console.log("Got chatHistory", data);

        db.collection('chatHistory').find( {
          $and : [
            { $or : [ { sender : chatData.sender }, { sender : chatData.receiver} ] },
            { $or : [ { receiver : chatData.sender },   { receiver : chatData.receiver } ] }
          ]
        }).toArray().then(function(results){
          console.log("hello chatHistory",messageObject.message, results);
          messageObject.message = results;
          messageObject.action = 'chatHistory';
          connections[chatData.sender].send(JSON.stringify(messageObject));
          connections[chatData.receiver].send(JSON.stringify(messageObject));
        })

      });  // db.close();
    })
  });
}

exports.chatHistory=function chatHistory(con,messageObject){
  var chatDetails =JSON.parse(messageObject.message);
  var sender = chatDetails.sender;
  var receiver = chatDetails.receiver;
  var date = chatDetails.Date;
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    db.collection('chatHistory').find( {
      $and : [
        { $or : [ { sender : sender }, { sender : receiver} ] },
        { $or : [ { receiver : sender },   { receiver : receiver } ] }
      ]
    }).toArray().then(function(results){
      console.log("hello chatHistory",messageObject.message, results);
      messageObject.message = results;
      connections[sender].send(JSON.stringify(messageObject));
      connections[receiver].send(JSON.stringify(messageObject));
    })

  });

}
