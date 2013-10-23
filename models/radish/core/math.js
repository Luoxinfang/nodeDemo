 /**
  * @description generate a random number
  * @author x.radish
  * @param {int} _minNum The min number
  * @param {int} _maxNum The max number
  * @param {Array} _rejArr reject array
  * @return {int} -1 error
  */
 function random(_minNum,_maxNum,_rejArr){
     var minNum=_minNum||4,
         maxNum=_maxNum||17,
         rejArr=_rejArr||[],
         num=-1,
         flag=true;
     num = Math.floor(Math.random()*(maxNum-minNum+1)+minNum);
     if(rejArr.length>maxNum-minNum) return -1;
     for(var i=0,len=rejArr.length;i<len;i++){
         if(num==rejArr[i]){
             flag=false; break;
         }
     }
     if(flag) return num; else return random(minNum,maxNum,rejArr);
 }

/**
 * @description Direct interception of the decimal without rounding
 * @author x.radish
 * @param {int} digits The number of decimal places
 * @return {Number}
 */
Number.prototype.toFix=function(digits){
    var f=parseInt(digits),
        n=Number(this),
        s=n.toString();
    var p=s.split(".");
    if(p[1]&&p[1].length>f){
        p[1]=p[1].substring(0,f);
        n=Number(p.join("."));
    }else{
        n=Number(this);
    }
    return n;
}