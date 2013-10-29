/**
 * Created by luoxinfang on 13-10-21.
 */
define(function (require) {
  require('jquery.cookie');
  require('lodash');


  var m = {
    user: {},
    socket: {},
    //建立socket
    buildSocket: function () {
      var user = JSON.parse($.cookie('user').toString());
      this.user = user;
      var socket = io.connect('http://10.6.1.132');
      this.socket = socket;

      socket.emit('enter', {user: user});
      socket.on('enter', function (data) {
        m.showTip(data.tip);
        m.initUserList(data.users);
      });
      socket.on('welcome', function(data){
        m.showTip(data.tip);
        m.initUserList(data.users);
      });
      socket.on('leave', function(user){
        m.showTip(user.name + 'leaved the room');
        m.updateUserList(user);
      });

      socket.on('reconnect', function() {
        m.showTip('reconnect server ...');
        setTimeout(function(){
          socket.emit('enter', {user: user});
        },2000);
      });

      socket.on('disconnect', function() {
        m.showTip('reconnect server ...');
        setTimeout(function(){
          socket.emit('enter', {user: user});
        },2000);
      });

      socket.on('say', function (data) {
        var content = decodeURIComponent(data.content);
        var user = data.user;
        $('.infoList').append('<div>' + user.name + ':' + content + '</div>');
      });

    },
    showTip: function (data) {
      $('#tooltip').text(data).show(100).delay(3500).hide(400);
    },
    sendMsg: function () {
      var content = encodeURIComponent($('#myInfo').html());
      $('.infoList').append('<div><span class="red"> ' + m.user.name + '</span>:' + content + '</div>');
      $('#myInfo').empty();
      m.socket.emit('say', {user: m.user, content: content});
    },
    clearMsg:function(){
      $('.infoList').empty();
    },
    resetMsg:function(){
      $('#myInfo').empty();
    },
    initUserList: function (list) {
      var html = [];
      _.forEach(list, function (user) {
        html.push('<li>' + user.name + '</li>')
      });
      $('#userList').html(html.join(''))
    },
    updateUserList: function (user) {

    },
    bindEvent: function () {
      $('#btn_send').on('click', this.sendMsg);
      $('#btn_reset').on('click',this.resetMsg);
      $('#btn_clear').on('click',this.clearMsg);
    },
    init: function () {
      this.buildSocket();
      this.bindEvent();
    }
  };
  m.init();
});