(function($, cookies) {

  var $loginSubmit    = $('#login-submit-btn');
  var $newUserSubmit  = $('#newuser-submit-btn');
  var $emailSubmit    = $('#email-submit-btn');
  var username        = $('#user-name').val();
  var password        = $('#user-pass').val();
  var email           = $('#user-email').val();
  var acctsCreated    = 0;
  var MAXACCOUNTS     = 5;

  // Login user
  $loginSubmit.on('click', function(e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/login',
      data: { username: username, password: password }
    }).done(function(data) {
      console.log("Data received:", data);
    });
  });

  // Create new account
  $newUserSubmit.on('click', function(e) {
    e.preventDefault();
    if( acctsCreated < MAXACCOUNTS ) {
      $.ajax({
        type: 'post',
        url: '/new_user',
        data: { username: username, password: password }
      }).done(function(data) {
        acctsCreated += 1;
        console.log("Data received:", data);
      });
    } else {
      notify(101);
    }
  });

  // Send email
  $emailSubmit.on('click', function(e) {
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/forgot_password/email',
      data: { email: email }
    }).done(function(data) {
      console.log("Data received:", data);
    });
  });

  // Notification logic
  var $page = $('.page');
  var errHash = {
    101: {
      err: "reached max",
      deets: "Maximum number of accounts reached. You can only create " + MAXACCOUNTS + " accounts."
    }
  }

  function notify(errNo) {
    if( $('.notification').length < 1 ) {
      $page.prepend($('<span class="notification" />')).addClass('notification-container');
    }

    var $notification = $('.notification');

    $notification.html(
      '<div class="title">' + errHash[errNo].err
      + '<i class="fa fa-close" aria-hidden="true"></i>' +'</div>'
      + '<div class="info">' + errHash[errNo].deets + '</div>'
    ).addClass('notification-enter');

    $notification.find('.fa-close').on('click', function() {
      $page.removeClass('notification-container');
      $notification.remove();
    });

    $('.notification-container').on('dblclick', function() {
      $page.removeClass('notification-container');
      $notification.remove();
    });

    if(errNo === 101) {
      $newUserSubmit.css({
        textDecoration: 'line-through',
        cursor: 'not-allowed'
      });
    }
  };

}(jQuery, Cookies));
