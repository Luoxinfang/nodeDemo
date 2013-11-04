/**
 * Created by luoxinfang on 13-10-18.
 */
define(function (require) {
  require('jquery');
  var postList = {
    showPost: function (e) {
      var _id=$(this).data('id')|| e.state.id;
      var url='/getPost/'+_id;
      $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        success: function (post) {
          var out=[];
          out.push('<h3>'+post.title+'</h3>');
          out.push('<div class="info">author:'+post.author +' | time: '+post.time+'</div>' );
          out.push('<div class="content">'+post.content+'</div>');
          $('.postContent').html(out.join(''));
        }, error: function () {
          $('.postContent').html('get post filed');
        }
      });
    },

    bindEvent: function () {
      $('.postList').delegate(' li', 'click', this.showPost);
    }
  };

  postList.bindEvent();
});