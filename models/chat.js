/**
 * Created by luoxinfang on 13-10-22.
 */

var users = [];
var _ = require('./radish/lib/lodash');
function Chat(socket) {
  this.socket = socket;
  this.init();
}

module.exports = Chat;


Chat.prototype.init = function () {
  var that = this,
    socket = this.socket;
  socket.on('enter', function (data) {
    var user = data.user;
    users.push(user);
    socket.user = user;
    socket.broadcast.emit('enter', {
      tip: user.name + ' enter the room',
      users: users
    });
    that.welcome({
      tip: 'welcome you ' + user.name,
      users: users
    });
  });

  socket.on('say', function (data) {
    socket.broadcast.emit('say', data);
  });

  //connect
  socket.on('connection',function(data){
    var user = data.user;
    users.push(user);
    socket.user = user;
    socket.broadcast.emit('enter', {
      tip: user.name + ' online',
      users: users
    });
    that.welcome({
      tip: 'welcome you ' + user.name,
      users: users
    });
  });
  //disconnect
  socket.on('disconnect', function () {
    socket.broadcast.emit('leave', socket.user);
    users = _.reject(users, function (user) {
      return _.isEqual(socket.user, user);
    });
  });

};
Chat.prototype.welcome = function (data) {
  this.socket.emit('welcome', data);
};