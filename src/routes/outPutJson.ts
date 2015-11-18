/// <reference path="../../typings/mssql/mssql.d.ts" />

import {Router} from 'express';
import * as sql from 'mssql';
//var sql = require('mssql');

var config = {
    user: 'demo',
    password: 'password@123',
    server: 'sol9xwt1o7.database.windows.net', // You can use 'localhost\\instance' to connect to named instance 
    database: 'devicemoinotringdb-dev',
    options: {
        encrypt: true ,// Use this if you're on Windows Azure 
        database: 'devicemoinotringdb-dev',
        
    }
}

const statusPlugin = Router();

/* GET Location Data from sql azure. */
statusPlugin.get('/', function(req, res, next) { 
    var service: string = req.query.service;
    var environment:number = req.query.environment;
    var status:number = req.query.status;
    var dcID:number = 0;
      
    
   // string service, int environment, int status, int dcId = 0
    var connection = new sql.Connection(config,function (err){
        
        if(err){
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.write("Got error :-( " + err);
            res.end("");
            return;
               }
        
          var request = new sql.Request(connection); // or: var request = connection.request(); 
          //query
        
           var query = "select  ResultJSON from [dbo].[PluginCurrentStatus] where PluginName = "+service+" and EnvironmentType ="+environment+" and [Status] ="+status+" AND [DataCenterId] = "+dcID;
          
            request.query(query, function(err, recordset) {
           
            if(err){
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.write("Got error :-( " + err);
            res.end("");
            return;
                   }
                  
            res.header('Content-Type: application/json');
            var response = [];             
            for (var i = 0; i < recordset.length; i++) {
                          response.push({ResultJSON:recordset[i].ResultJSON})           
            // res.json({ID:recordset[i].ID ,Type:recordset[i].Type});
         }
         res.send(response);
         res.end("");    
         
    }); 
    })
});

export default statusPlugin;
