'use strict'

class LoginController {

  * login (request, response) {
    const view = yield response.view('loginForm')
    response.send(view)
  }

  * forgotPass (request, response) {
    const view = yield response.view('forgotPassForm')
    response.send(view)
  }

}

module.exports = LoginController
