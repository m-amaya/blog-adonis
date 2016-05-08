(function($, cookies) {

  var $loginSubmit = $('#login-submit-btn');
  var $newUserSubmit = $('#login-newuser-btn');
  var username = $('#user-name').val();
  var password = $('#user-pass').val();

  $loginSubmit.on('click', function(e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/login',
      data: { username: username, password: password }
    });
  });

  $newUserSubmit.on('click', function(e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/new_user',
      data: { username: username, password: password }
    });
  });

}(jQuery, Cookies));
