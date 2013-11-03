define(function(require){
  require('jquery');
  var Key={
    setKeyStatus:function(code,status){
      this[code]=status;
      console.log(code,status)
    }
  };

  Key.listen=function(e,_el){
    var code= e.keyCode,el=_el||this;
    if(!$(el)){
      el=window;
    }
    $(el).on('keydown',Key.setKeyStatus(code,true));
    $(el).on('keyup',Key.setKeyStatus(code,false));
  };
  Key.mapping=function(e,code,callback){
    if(e.keyCode==code && callback && typeof callback == 'function'){
      callback();
    }
  };
  return Key;
});