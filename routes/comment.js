var express = require('express');
var CommentModel = require('CommentModel');
var router = express.Router();

router.route('/')
.get(function(req, res) {
  var commentModel = new CommentModel();
  commentModel.query(req.query.type, req.query.id, req.query.seq, function(ret, data){
    if(ret)
      res.json(data);
    else
      res.json({
        result: 'fail',
        message: data
      });
  });
})

.post(function(req, res) {
  var type = req.body['type'];
  var id = req.body['id']; 
  var from_type = req.body['from_type'];
  var from_id = req.body['from_id'];
  var score = req.body['score'];
  var comment = req.body['comment'];
  var order_id = req.body['order_id'];

  var commentModel = new CommentModel();
  commentModel.add(type, id, from_type, from_id, score, comment, order_id, 
    function(ret, data){
    if( ret )
      res.json({
        result: 'success',
        seq: data[0]["spAddComment"]
      });
    else
      res.json({
        result: 'fail',
        message: data
      });
  });
})

router.route('/send')
.get(function(req, res) {
  var commentModel = new CommentModel();
  commentModel.queryByFrom(req.query.from_type, req.query.from_id, req.query.seq, function(ret, data){
    if(ret)
      res.json(data);
    else
      res.json({
        result: 'fail',
        message: data
      });
  });
})

module.exports = router;