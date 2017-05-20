var csv = require("fast-csv");

var patientNamespace = {};

let rows = [];

module.exports =
{  
   patientNamespace,RunJob: function (knex) {
        
        //CSV parsing
        csv.fromPath("data_file.csv")
            .on("data", function(data){  
                if(data[0] !== "Content date") {                

                    if((typeof data[0] != 'undefined')){    
                    
                        var newObject = { 
                            ContentDate: (data[0] == "") ? " " : data[0],
                            ContentTime: (data[1] == "") ? " " : data[1], 
                            AccessionNumber: (data[2] == "") ? " " : data[2],
                            ExposureMode: (data[3] == "") ? " " : data[3],
                            Protocol: (data[4] == "") ? " " : data[4],
                            BodypartExamined: (data[5] == "") ? " " : data[5],
                            PatientOrientation: (data[6] == "") ? " " : data[6],
                            ViewPosition: (data[7] == "") ? " " : data[7],
                            OperatorName: (data[8] == "") ? " " : data[8],
                            RejectDate: (data[9] == "") ? " " : data[9],
                            RejectTime: (data[10] == "") ? " " : data[10],
                            RejectReason: (data[11] == "") ? " " : data[11],
                            RejectOperatorName: (data[12] == "") ? " " : data[12],
                            DAP: (data[13] == "") ? " " : data[13],
                            AbsorbedDose: (data[14] == "") ? " " : data[14],
                            AirKerma: (data[15] == "") ? " " : data[15],
                            REX: (data[16] == "") ? " " : data[16],
                            EI: (data[17] == "") ? " " : data[17],
                            EIt: (data[18] == "") ? " " : data[18],
                            DI: (data[19] == "") ? " " : data[19],
                            KV: (data[20] == "") ? " " : data[20],
                            MA: (data[21] == "") ? " " : data[21],
                            MS: (data[22] == "") ? " " : data[22],
                            MAS: (data[23] == "") ? " " : data[23],
                            SID: (data[24] == "") ? " " : data[24],    
                            SensorSN: (data[25] == "") ? " " : data[25],    
                            Workspace: (data[26] == "") ? " " : data[26],    
                            SOD: (data[27] == "") ? " " : data[27]   
                        };

                        rows.push(newObject);
                        //console.log(rows);
                        //knex.insert(newObject).into("PatientImageTracker").then(function(ID){                                                 
                            //console.log(ID);
                        //});
                    }
                }
            })
            .on("end", function(){ 
                //batch insert     
               knex.batchInsert('PatientImageTracker', rows, 2000).returning('ID')
                .then(function(ids) { 
                    console.log(ids);                      
                });                     

            });        
         
        }
}


