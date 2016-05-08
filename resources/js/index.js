(function($, cookies) {

  var $loginSubmit = $('#login-submit-btn');
  var username = $('#user-name').val();
  var password = $('#user-pass').val();

  $loginSubmit.on('click', function(e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/signin',
      data: { username: username, password: password }
    });
  });

}(jQuery, Cookies));
