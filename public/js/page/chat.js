/**
 * Created by luoxinfang on 13-10-21.
 */
define(function(require){
  require('jquery.cookie');
  require('lodash');


  var user = $.cookie('user');
  var socket = io.connect('http://localhost');


  socket.emit('online',{user: user});
  socket.on('online',function(data){
    $('#tooltip').text(data);
    $('#tooltip').show(100).delay(3000).hide(500);
  });
  socket.on('welcome', function (data) {
    $('#tooltip').text(data.hello);
    $('#tooltip').show(100).delay(3000).hide(500);
  });
  socket.on('say',function(data){
    var content=decodeURIComponent(data.content);
    $('.infoList').append('<div>'+content+'</div>');
  });
   var m={
    sendMsg:function(){
      var content=encodeURIComponent($('#myInfo').html());
      $('.infoList').append('<div>'+content+'</div>');
      $('#myInfo').empty();
      socket.emit('say',{content: content});
    },

     bindEvent:function(){
       $('#btn_send').on('click',this.sendMsg);
     }
   };
  m.bindEvent();
});