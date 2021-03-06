var dbBase = require('dbBase');

function MessageModel() {}

MessageModel.prototype.query = function(type, id, seq, callback) {
  var db = new dbBase();
  db._query('SELECT * from "spGetMessage"($1, $2, $3);', [type, id, seq]).then(function(result){
    callback( true, result.rows );
  }).catch(function(err){
    callback( false, err );
  });
};

MessageModel.prototype.queryByDate = function(type, id, date, callback) {
  var db = new dbBase();
  db._query('SELECT * from "spGetMessageByDate"($1, $2, $3);', [type, id, date]).then(function(result){
    callback( true, result.rows );
  }).catch(function(err){
    callback( false, err );
  });
};

MessageModel.prototype.queryByUser = function(type, id, otherType, otherID, seq, callback) {
  var db = new dbBase();
  db._query('SELECT * from "spGetMessageByUser"($1, $2, $3, $4, $5);', [type, id, otherType, otherID, seq]).then(function(result){
    callback( true, result.rows );
  }).catch(function(err){
    callback( false, err );
  });
};

MessageModel.prototype.updateRead = function(toType, toID, fromType, fromID, seq, callback) {
  var db = new dbBase();
  db._query('SELECT "spSetMessageRead"($1, $2, $3, $4, $5);', [toType, toID, fromType, fromID, seq]).then(function(result){
    callback( true, result.rows );
  }).catch(function(err){
    callback( false, err );
  });
};

MessageModel.prototype.add = function(from_type, from_id, to_type, to_id, msg, callback) {
  var db = new dbBase();
  db._query('SELECT * from "spAddMessage"($1, $2, $3, $4, $5);', 
  	[from_type, from_id, to_type, to_id, msg]).then(function(result){
    var ret = result.rows[0]["spAddMessage"];
    callback( true, ret );
  }).catch(function(err){
    callback( false, err );
  });
};

module.exports = MessageModel;