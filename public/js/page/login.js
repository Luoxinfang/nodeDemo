/**
 * Created by lenovo on 13-10-19.
 */
define(function (require) {
  var Form = require('Form');
  var user = {
    name: 'name',
    password: 'password'
  };
  Form.noEmpty('#btn_login','click',user);
});
