/**
 * Created by lenovo on 13-10-20.
 */
define(function(require){
  var Form=require('Form');
  var post={
    title:'title',
    content:'content'
  }
  Form.noEmpty('#btn_post','click',post);
});