var sql       = require("mssql");
var myConfig  = require("./config");

var connection = sql.connect(myConfig.config.database, function (err) {
 if (err)
     throw err; 
});

exports.executeQuery = (res, query) => {               
              var request = new sql.Request();
              request.query(query, function (err, recordset) {
                if (err) {
                          console.log("Error while querying database :- " + err);
                          res.send(err);
                         }
                else     {
                           res.send(recordset);
                         }
                     });           
  };

exports.executeStoredProc = (spName, sqlParams) => {   
        var request = new sql.Request(connection);
        request.execute(spName, sqlParams).then(function (recordSet) {            
            console.log(recordSet);
        }).catch(function (err) {
            console.log(err);
        });
};



