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
var express_1 = require('express');
var users = express_1.Router();
/* GET users listing. */
// users.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
users.get('/', function (req, res, next) {
    res.render('users');
});
users.get('/us', function (req, res, next) {
    res.send('respond with a us');
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = users;
//# sourceMappingURL=users.js.map