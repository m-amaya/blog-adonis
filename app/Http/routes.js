'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Routes helps you in defining http endpoints/urls which will be used
| by outside world to interact with your application. Adonis has a
| lean and rich router to support various options out of the box.
|
*/
const Route = use('Route')

Route.get('/', 'LoginController.index');
Route.get('/forgot_password', 'LoginController.forgotPass');
Route.post('/new_user', 'LoginController.createUser');
Route.get('/login', 'LoginController.login').middlewares(['auth']);


Route.get('/me', function * (request, response) {
  const username = yield request.session.get('username');
  const view = yield response.view('me', { name: username });

  response.send(view);
}).middlewares(['authSession']);


Route.get('/home', function * (request, response) {
  response.send("Read ALL blogs");
})


Route.post('/forgot_password/email', function * (request, response) {
  response.send("Sent your email");
});
