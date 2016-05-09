'use strict'

class AuthSession {

  *handle (request, response, next) {
    const session = request.cookie('adonis-session');

    if( !session || !session.username ) {
      response.route('/');
      return;
    }

    yield next
  }

}

module.exports = AuthSession
