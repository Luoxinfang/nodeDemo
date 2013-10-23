/**
 * Created by luoxinfang on 13-10-18.
 */
define(function (require, exports) {

	require('bootstrap');//we used bootstrap in our project
  require('lodash');
  $('nav li').removeClass('active');
  var page=location.pathname;
  _.forEach($('nav li'),function(li){
    if($(li).children('a').text().toLowerCase().substr(0,3)==page.replace('/','').substr(0,3)){
      $(li).addClass('active');
    }
  });
});