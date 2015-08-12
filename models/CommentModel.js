var dbBase = require('dbBase');

function CommentModel() {}

CommentModel.prototype.query = function(type, id, seq, callback) {
  var db = new dbBase();
  db._query('select * from "spGetComment"($1, $2, $3)', [type, id, seq]).then(function(result){
    callback( true, result.rows );
  }).catch(function(err){
    callback( false, err );
  });
};

CommentModel.prototype.add = function(type, id, from_type, from_id, score, comment, callback) {
  var db = new dbBase();
  db._query('select "spAddComment"($1, $2, $3, $4, $5, $6)', 
       [type ,id, from_type, from_id, score, comment]).then(function(result){
    callback( true, result.rows );
  }).catch(function(err){
    callback( false, err );
  });
};

module.exports = CommentModel;