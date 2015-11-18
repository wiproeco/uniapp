import {Router} from 'express';
var sql = require('mssql');

var config = {
    user: 'demo',
    password: 'password@123',
    server: 'sol9xwt1o7.database.windows.net', // You can use 'localhost\\instance' to connect to named instance 
     
    options: {
        encrypt: true ,// Use this if you're on Windows Azure 
        database: 'devicemoinotringdb-dev',
        
    }
}

const environment = Router();

/* GET Location Data from sql azure. */
environment.get('/', function(req, res, next) {   
    
    var connection = new sql.Connection(config,function (err){
        
        if(err){
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.write("Got error :-( " + err);
            res.end("");
            return;
               }
        
        var request = connection.request(); // or: var request = connection.request(); 
            request.query('Select ID, Type from Environment', function(err, recordset) {
           
            if(err){
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.write("Got error :-( " + err);
            res.end("");
            return;
                   }
                   
            res.header('Content-Type: application/json');
            var response = [];             
            for (var i = 0; i < recordset.length; i++) {
                          response.push({ID:recordset[i].ID ,Type:recordset[i].Type})           
            // res.json({ID:recordset[i].ID ,Type:recordset[i].Type});
         }
         res.send(response);
         res.end("");    
         
    }); 
    })
});

export default environment;
