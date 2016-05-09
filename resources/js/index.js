ACCTSCREATED        = 0;
MAXACCOUNTS         = 5;

(function($, cookies) {
  var $loginSubmit    = $('#login-submit-btn');
  var $newUserSubmit  = $('#newuser-submit-btn');
  var $emailSubmit    = $('#email-submit-btn');
  var email           = $('#user-email').val();
  var errHash = {
    101: {
      error: "reached max",
      info: "Maximum number of accounts reached. You can only create " + MAXACCOUNTS + " accounts."
    }
  }

  // Login
  $loginSubmit.on('click', function(e) {
    e.preventDefault();
    var username        = $('#user-name').val();
    var password        = $('#user-pass').val();

    $.ajax({
      type: 'get',
      url: '/home',
      data: { username: username, password: password }
    }).done(function(data) {
      if(data.error) {
        notify(data);
      }
    });
  });

  // Create new account
  $newUserSubmit.on('click', function(e) {
    e.preventDefault();
    var username        = $('#user-name').val();
    var password        = $('#user-pass').val();

    if( ACCTSCREATED < MAXACCOUNTS ) {
      $.ajax({
        type: 'post',
        url: '/new_user',
        data: { username: username, password: password }
      }).done(function(data) {
        if(data.error) {
          notify(data);
          return;
        }
        notify(null, data);
        ACCTSCREATED += 1;
      });
    } else {
      notify(errHash[101]);
      $newUserSubmit.css({
        textDecoration: 'line-through',
        cursor: 'not-allowed',
        color: '#722777',
        background: '#4d1a51'
      });
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

  function notify(errorObj, successObj) {
    if( $('.notification').length < 1 ) {
      $page.prepend($('<span class="notification" />')).addClass('notification-container');
    }

    var $notification = $('.notification');

    if(errorObj) {
      $notification.html(
        '<div class="title">' + errorObj.error
        + '<i class="fa fa-close" aria-hidden="true"></i>' +'</div>'
        + '<div class="info">' + errorObj.info + '</div>'
      ).addClass('notification-enter notification-error');
    } else {
      $notification.html(
        '<div class="title">Congratulations!'
        + '<i class="fa fa-close" aria-hidden="true"></i>' +'</div>'
        + '<div class="info">' + successObj.success + '</div>'
      ).addClass('notification-enter notification-success');
    }

    $notification.find('.fa-close').on('click', function() {
      $page.removeClass('notification-container');
      $notification.remove();
    });

    $('.notification-container').on('dblclick', function() {
      $page.removeClass('notification-container');
      $notification.remove();
    });
  };

}(jQuery, Cookies));
