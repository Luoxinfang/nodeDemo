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
    socket.user = user;
    socket.broadcast.emit('enter', {
      tip: user.name + ' enter the room',
      users: users
    });
    that.welcome(user);
    users.push(user);
  });

  socket.on('say', function (data) {
    socket.broadcast.emit('say', data);
  });

  //
  socket.on('reconnect', function() {
    var sys = '<div style="color:#f00">系统:重新连接服务器！</div>';
    $("#contents").append(sys + "<br/>");
    socket.emit('online');
  });
  //
  socket.on('disconnect', function () {
    socket.broadcast.emit('leave', socket.user.name + ' leave the room');
    users = _.reject(users, function (user) {
      return _.isEqual(socket.user, user);
    });
  });
}
Chat.prototype.welcome = function (user) {
  this.socket.emit('welcome', 'welcome you,' + user.name);
};