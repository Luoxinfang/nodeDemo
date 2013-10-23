/**
 * Created by luoxinfang on 13-10-18.
 */
define(function(require){
  var Form = require('Form');
  var user = {
    name: 'name',
    password: 'password',
    email:'email'
  };
  Form.noEmpty('#btn_reg','click',user);
});