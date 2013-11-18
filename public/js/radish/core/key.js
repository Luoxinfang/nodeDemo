define(function (require) {
  require('jquery');
  require('lodash');
  var Key = {
    keyCode:{},
    setKeyStatus: function (code, status) {
      this.keyCode[code] = status;
      console.log(code, status)
    }
  };
  Key.listen = function (_el, _keys) {
    var el = _el || this ,keys=[];
    keys.push(_keys);
    $(el).on('keydown', function(e){
      if(_.indexOf(keys,e.keyCode)){
        Key.setKeyStatus(e.keyCode, true);
      }
    });
    $(el).on('keyup', function(e){
      if(_.indexOf(keys,e.keyCode)){
        Key.setKeyStatus(e.keyCode, false);
      }
    });
  };
  Key.isDown = function (keys) {
    for (var i = 0, l = keys.length; i < l; i++) {
      if (!this.keyCode[keys[i]]) {
        return false;
      }
    }
    return true;
  };
  /**
   * @description caption the key combination
   * @author x.radish
   * @param {string} _el The element listen key down
   * @param {Array} keys The key combination in order
   * @param {Function} callback The function to be trigger
   */
  Key.where = function (_el, keys, callback) {
    var el = $(_el) , lastCode = _.last(keys);
    if (el && keys && typeof callback == 'function') {
      var preKeys= _.without(keys,lastCode);
      this.listen(_el,preKeys);
      el.on('keydown', function (e) {
        if (e.keyCode == lastCode && Key.isDown(preKeys)) {
          callback();
        }
      });
    }
  };
  return Key;
});