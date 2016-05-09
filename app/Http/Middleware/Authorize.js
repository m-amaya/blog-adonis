'use strict'
const User = use('App/Model/User');
const Hash = use('Hash');

class Authorize {

  *handle (request, response, next) {
    const credentials = request.only('username', 'password');
    const users = yield User.select('username', 'passHash');
    const user = users.filter( o => o.username === credentials.username);

    if( !user.length > 0 ) {
      response.json({
        error: 'User not found',
        info: 'Hrmm... that user cannot be located. Did you try creating an account first?'
      });
      return;
    }

    const isSafe = yield Hash.verify(credentials.password, user[0].passHash);

    if( !isSafe ) {
      response.json({
        error: 'Incorrect Password',
        info: "Hey, that's not the password I remember! If you're having trouble go \
        ahead and create a new account, or view an existing one with 'm-amaya / password'."
      });
      return;
    }

    yield request.session.put('username', credentials.username);
    yield next;
  }

}

module.exports = Authorize
