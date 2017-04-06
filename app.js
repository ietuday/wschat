var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL
var url = 'mongodb://192.168.10.43/UsersOnline';

MongoClient.connect(url, function(err, db) {
var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('broadcast');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}
var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('broadcast');
  // Find some documents
  collection.find({'a': 3}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
}
});
// Use connect method to connect to the server

// MongoClient.connect(url, function(err, db) {
  // assert.equal(null, err);
//insert code
  // var insert = db.collection('UsersOnline').insertMany(
  //    array
  // );
  // console.log(insert);
  // console.log("inserted");
  //
  // // display all the data whiich is inserted
  // var cursor= db.collection('UsersOnline').find();
  //   cursor.each(function(err,docs){
  //     console.log(docs);
  //   db.close();
  // });
  // console.log("Connected successfully to server");
