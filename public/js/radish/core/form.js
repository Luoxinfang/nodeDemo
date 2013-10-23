/**
 * Created by luoxinfang on 13-10-18.
 */
define(function (require,exports) {
  require('jquery');
  require('lodash');
  var Form = {
    noEmpty: function (elem, event, obj) {
      $(elem).on(event, function (e) {
        _(obj).forEach(function (k, v) {
          var elem = $('#' + v) || $('.' + v) || $(v);
          var value = elem ? elem.val() : null;
          if (!value) {
            alert(v + ' should not be empty!');
            elem.focus();
            e.preventDefault();//prevent form submit
            return false;
          }
        });
      });
    }
  };
  return Form;
});