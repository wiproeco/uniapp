var express_1 = require('express');
var sql = require('mssql');
var config = { 
     user: 'nodejsadmin', 
     password: 'Narmada!12', 
     server: 'nodejsserver.database.windows.net', 
     options: { 
         encrypt: true, 
         database: 'nodejsdata', 
     } 
 }; 

var environment = express_1.Router();
/* GET Location Data from sql azure. */
environment.get('/', function (req, res, next) {
    var connection = new sql.Connection(config, function (err) {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.write("Got error :-( " + err);
            res.end("");
            return;
        }
        var request = connection.request(); // or: var request = connection.request(); 
        request.query('Select ID, Type from Environment', function (err, recordset) {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.write("Got error :-( " + err);
                res.end("");
                return;
            }
            res.header('Content-Type: application/json');
            var response = [];
            for (var i = 0; i < recordset.length; i++) {
                response.push({ ID: recordset[i].ID, Type: recordset[i].Type });
            }
            res.send(response);
            res.end("");
        });
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = environment;
//# sourceMappingURL=environment.js.map
