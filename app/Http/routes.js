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

Route.get('/', 'LoginController.login');
Route.get('/forgot_password', 'LoginController.forgotPass');
Route.post('/new_user', 'LoginController.createUser');


Route.post('/forgot_password/email', function * (request, response) {
  response.send("Sent your email");
});

Route.get('/home', function * (request, response) {
  response.send("Read ALL blogs");
});

Route.post('/login', function * (request, response) {
  response.send("Welcome back!");
});
