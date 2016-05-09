'use strict'
const User = use('App/Model/User');
const Hash = use('Hash');

class LoginController {

  * login (request, response) {
    const view = yield response.view('loginForm')

    response.send(view)
  }

  * forgotPass (request, response) {
    const view = yield response.view('forgotPassForm')

    response.send(view)
  }

  * createUser (request, response) {
    const currUsers = yield User.select('username');
    const username = request.input('username');
    const userExists = currUsers.filter( o => o.username === username);

    if(username.length > 10) {
      response.json({
        error: 'Too long',
        info: 'Usernames can only be a maximum of 10 characters in length. Let\'s try that again!'
      });
      return;
    }

    if(userExists.length > 0) {
      response.json({
        error: 'User already exists',
        info: `Whoops! Looks like ${username} is already taken. How about another one?`
      });
      return;
    }

    const user = new User();
    user.attributes.username = request.input('username');
    user.attributes.passHash = yield Hash.make(request.input('password'));
    const reply = yield user.create();
    response.json({
      success: `${username} has been successfully created. Try logging in.`
    });
  }
}

module.exports = LoginController
