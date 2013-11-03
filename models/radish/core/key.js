define(function(require){
  require('jquery');
  var Key={
    setKeyStatus:function(code,status){
      this[code]=status;
    }
  };

  Key.listen=function(el,e){
    var _this=this;
    if(!$(el)){
      el=window;
    }
    $(el).on('keydown',_this.setKeyStatus(e.code,true));
    $(el).on('keyup',_this.setKeyStatus(e.code,false));
  };
  Key.mapping=function(e,code,callback){
    if(e.keyCode==code && callback && typeof callback == 'function'){
      callback();
    }
  };
  return Key;
});