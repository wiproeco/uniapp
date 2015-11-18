/// <reference path="../../typings/mssql/mssql.d.ts" />
var express_1 = require('express');
var sql = require('mssql');
//var sql = require('mssql');
var config = {
    user: 'demo',
    password: 'password@123',
    server: 'sol9xwt1o7.database.windows.net',
    database: 'devicemoinotringdb-dev',
    options: {
        encrypt: true,
        database: 'devicemoinotringdb-dev',
    }
};
var outPutJson = express_1.Router();
/* GET Location Data from sql azure. */
outPutJson.get('/', function (req, res, next) {
    var service = req.query.service;
    var environment = req.query.environment;
    var status = req.query.status;
    var dcID = 0;
    // string service, int environment, int status, int dcId = 0
    var connection = new sql.Connection(config, function (err) {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.write("Got error :-( " + err);
            res.end("");
            return;
        }
        var request = new sql.Request(connection); // or: var request = connection.request(); 
        //query
        var query = "select  ResultJSON from [dbo].[PluginCurrentStatus] where PluginName = " + service + " and EnvironmentType =" + environment + " and [Status] =" + status + " AND [DataCenterId] = " + dcID;
        request.query(query, function (err, recordset) {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.write("Got error :-( " + err);
                res.end("");
                return;
            }
            res.header('Content-Type: application/json');
            var response = [];
            for (var i = 0; i < recordset.length; i++) {
                response.push({ ResultJSON: recordset[i].ResultJSON });
            }
            res.send(response);
            res.end("");
        });
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = outPutJson;
//# sourceMappingURL=outPutJson.js.map