var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.post('/create', function(req, res) {
  models.User.create({
    username: req.param('username')
  }).then(function() {
    res.redirect('/');
  });
});

router.get('/:user_id/destroy', function(req, res) {
  models.User.find({
    where: {id: req.param('user_id')},
    include: [models.Task]
  }).then(function(user) {
    models.Task.destroy(
      {where: {UserId: user.id}}
    ).then(function(affectedRows) {
      user.destroy().then(function() {
        res.redirect('/');
      });
    });
  });
});

router.post('/:user_id/tasks/create', function (req, res) {
  models.User.find({
    where: { id: req.param('user_id') }
  }).then(function(user) {
    models.Task.create({
      title: req.param('title')
    }).then(function(title) {
      title.setUser(user).then(function() {
        res.redirect('/');
      });
    });
  });
});

router.get('/:user_id/tasks/:task_id/toggle-complete', function (req, res) {
  models.Task.find({
    where: { id: req.param('task_id') }
  }).then(function(task) {
    var completed = !!task.completed;
    task.completed = !completed;
    task.save().then(function() {
      res.redirect('/');
    });
  });
});


module.exports = router;
