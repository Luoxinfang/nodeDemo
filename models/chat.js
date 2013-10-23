/**
 * Created by luoxinfang on 13-10-22.
 */

function Chat(socket){
  this.socket=socket;
  this.init();
}

module.exports=Chat;


Chat.prototype.init=function(){
  var that=this,
    socket=this.socket;

  socket.on('online',function(user){
    console.log('-->:',user);
    socket.broadcast.emit('online', user.name+' is online!');
    that.welcome();
  });
  socket.on('say',function(data){
    socket.broadcast.emit('say',data);
  });
}
Chat.prototype.welcome=function(){
  var socket=this.socket;
  socket.emit('welcome',{hello:'welcome you,'});

}