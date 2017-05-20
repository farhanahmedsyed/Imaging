var express = require('express');

var patientNamespace = {};

patientNamespace.routes = function(knex){
   
   var loaderRouter = express.Router(); 

    //route for get and post data
    //loaderRouter.route('/Loaders/ProcessCSV')   
       /*.post(function(req,res){
        
            //CSV parsing
            csv.fromPath("loaderfile.csv")
                .on("data", function(data){                   
                    var newObject = { ID: data[0], Name: data[1], Description: data[2] };
                    knex.insert(newObject).into("FileDataTable").then(function(ID){
                        console.log(ID);
                    });                     
                })
                .on("end", function(){
                    console.log("done");
                });     
        });*/

     
        loaderRouter.route('/Loaders/GetData')
            .get(function(req,res){      

             var sensorSN = String(req.param('SensorSN'));                        
              //getting data from db                            
              knex.select("SensorSN","EI").from("PatientImageTracker").where('SensorSN',sensorSN).asCallback(function(err,rows){
                if(err){console.error(err);}
                else
                {             
                    res.json(rows);
                }
                //knex.destroy();
            });

        });

  return loaderRouter;      
};

module.exports = patientNamespace.routes;