// import {Router} from 'express';
// 
// const users = Router();
// 
// /* GET users listing. */
// users.get('/', function(req, res, next) {
//   res.send('respond with a resource test rajiv');
// });
// 
// export default users;


import {Router} from 'express';

const users = Router();

/* GET users listing. */
// users.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

users.get('/', function(req, res, next) {
  res.render('users');
});

users.get('/us', function(req, res, next) {
  res.send('respond with a us');
});

export default users;
