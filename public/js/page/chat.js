/**
 * Created by luoxinfang on 13-10-21.
 */
define(function (require) {
  require('jquery.cookie');
  require('lodash');
  var Key = require('Key');
  var m = {
    user: {},
    socket: {},
    //建立socket
    buildSocket: function () {
      var user = JSON.parse($.cookie('user').toString());
      this.user = user;
      var socket = io.connect('http://localhost');
      this.socket = socket;

      socket.emit('enter', {user: user});
      socket.on('enter', function (data) {
        m.showTip(data.tip);
        m.initUserList(data.users);
      });
      socket.on('connection', function (data) {
        m.showTip(data.tip);
        m.initUserList(data.users);
      });
      socket.on('welcome', function (data) {
        m.showTip(data.tip);
        m.initUserList(data.users);
      });
      socket.on('leave', function (user) {
        m.showTip(user.name + 'leaved the room');
        m.updateUserList(user);
      });

      socket.on('reconnect', function () {
        m.showTip('reconnect server ...');
        setTimeout(function () {
          socket.emit('enter', {user: user});
        }, 2000);
      });

      socket.on('disconnect', function () {
        m.showTip('reconnect server ...');
        setTimeout(function () {
          socket.emit('enter', {user: user});
        }, 2000);
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
      var content = $('#myInfo').html(),
        showHtml = '<div><span class="red"> ' + m.user.name + '</span>:' + content + '</div>';
      $('.infoList').append(showHtml);
      m.socket.emit('say', {user: m.user, content: encodeURIComponent(content)});
      $('#myInfo').empty();

    },
    clearMsg: function () {
      $('.infoList').empty();
    },
    resetMsg: function () {
      $('#myInfo').empty();
    },
    initUserList: function (list) {
      var html = [];
      _.forEach(list, function (user) {
        html.push('<li>' + user.name + '</li>')
      });
      $('#userList').html(html.join(''));
    },
    updateUserList: function (user) {
      var users = [], userUl = $('#userList').children('li');
      _.each(userUl, function (li) {
        users.push($(li).text());
      });
      var index = _.indexOf(users, user['name']);
      if (index == -1) {
        $('#userList').append('<li>' + user.name + '</li>');
      } else {
        $('#userList').children('li').eq(index).remove();
      }
    },
    bindEvent: function () {
      $('#btn_send').on('click', this.sendMsg);
      $('#btn_reset').on('click', this.resetMsg);
      $('#btn_clear').on('click', this.clearMsg);
      Key.where('#myInfo',[17,13], this.sendMsg);
    },
    init: function () {
      this.buildSocket();
      this.bindEvent();
    }
  };
  m.init();
});