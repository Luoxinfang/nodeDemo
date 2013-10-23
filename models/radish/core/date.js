/**
 * @description format the time
 * @author xf.radish
 * @param {String} format The format your want
 * @param {String} lang The language
 * @return {String} Return the format time
 * @example
 *    var time = new Date();
 *    time.format('YYYY MMM dd , hh:mm:ss  www','e');
 */

Date.prototype.format = function (format,lang) {
  var o = {
    'Y+': this.getFullYear(),//year
    'M+': this.getMonth() + 1,//month
    'w+': this.getDay(),     //week
    'd+': this.getDate(),    //day
    'h+': this.getHours(),   //hour
    'm+': this.getMinutes(), //minute
    's+': this.getSeconds(), //second
    'q+': Math.floor((this.getMonth() + 3) / 3),  //quarter
    'S+': this.getMilliseconds() //millisecond
  };
  var language={
    en:{
      'MMM' : 'null jan feb mar apr may jun jul aug sep oct nov dec'.split(' '),
      'www'    : 'sun mon tue wed thu fri sat'.split(' ')
    },
    zh:{
      'MMM' : 'null 一月 二月 三月 四月 五月 六月 七月 八月 九月 十月 十一月 十二月'.split(' '),
      'www' : '星期日 星期一 星期二 星期三 星期四 星期五 星期六'.split(' ')
    }
  }
  for (var k in o){
    var reg='(' + k + ')';
    var flag=new RegExp(reg).test(format);
    var r1=RegExp.$1;
    if(r1.length == 3){
      format=format.replace(r1,lang?lang:'en'+'_'+r1+'_'+o[k]);
    }else{
      format=format.replace(r1,('00'+o[k]).substr(-r1.length));
    }
  };
  format=format.replace(/(\w+)_(\w+)_(\w+)/g,function(match, r1, r2 ,r3){
    try{
      return language[r1][r2][r3];
    }catch(e){
      alert(e);
    }
  });
  return format;
};