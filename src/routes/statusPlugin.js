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

var statusPlugin = express_1.Router();
/* GET Location Data from sql azure. */
statusPlugin.get('/:id/:serviceType?', function (req, res, next) {
    var envType = req.params.id;
    var serviceType = req.params.serviceType;
    var query = "SELECT M.PluginName  as [ServiceName], M.Status as [Status], M.Timestamp as[Time], M.EnvironmentType as [EnvironmentType], ST.[Name] as[ServiceType], M.ResultJSON as [ResultJSON], M.DataCenterId as [DataCenterId],DC.Location as [Location]" +
        "FROM [dbo].[PluginCurrentStatus] M INNER JOIN [dbo].[Services] S ON M.[ServiceId]=S.ID INNER JOIN [dbo].[ServiceType]  ST ON ST.[Id]=S.[ServiceTypeId] LEFT JOIN [dbo].DataCenters DC ON DC.DataCenterId = M.DataCenterId " +
        "WHERE M.EnvironmentType = " + envType;
    if (serviceType !== undefined) {
        query += " and ST.Name= " + "'" + serviceType + "'";
    }
    query += " Order By S.DisplayOrder";
    var connection = new sql.Connection(config, function (err) {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.write("Got error :-( " + err);
            res.end("");
            return;
        }
        var request = connection.request(); // or: var request = connection.request(); 
        //query
        // var query = "SELECT M.PluginName  as [ServiceName], M.Status as [Status], M.Timestamp as[Time], M.EnvironmentType as [EnvironmentType], ST.[Name] as[ServiceType], M.ResultJSON as [ResultJSON], M.DataCenterId as [DataCenterId],DC.Location as [Location]" +
        //                                               "FROM [dbo].[PluginCurrentStatus] M INNER JOIN [dbo].[Services] S ON M.[ServiceId]=S.ID INNER JOIN [dbo].[ServiceType]  ST ON ST.[Id]=S.[ServiceTypeId] LEFT JOIN [dbo].DataCenters DC ON DC.DataCenterId = M.DataCenterId " +
        //                                               "WHERE M.EnvironmentType = "+ envType +" Order By S.DisplayOrder";
        //   
        request.query(query, function (err, recordset) {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.write("Got error :-( " + err);
                res.end("");
                return;
            }
            var a;
            res.header('Content-Type: application/json');
            var response = [];
            for (var i = 0; i < recordset.length; i++) {
                response.push({ ServiceName: recordset[i].ServiceName, Status: recordset[i].Status, Time: recordset[i].Time, EnvironmentType: recordset[i].EnvironmentType, ServiceType: recordset[i].ServiceType, ResultJSON: recordset[i].ResultJSON, DataCenterID: recordset[i].DataCenterID, Location: recordset[i].Location });
            }
            res.send(response);
            res.end("");
        });
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = statusPlugin;
//# sourceMappingURL=statusPlugin.js.map
