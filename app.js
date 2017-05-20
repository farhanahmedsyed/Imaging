
// call the packages we need
var express = require('express');
var cfg = require("./knex-cfg").pg;
var knex = require("knex")(cfg);
var schedule = require('node-schedule');
var ldr = require("./Job/loader");

var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 6)];
rule.hour = 17;
rule.minute = 38;

var j = schedule.scheduleJob(rule, function(){
    
    ldr.RunJob(knex);                   
});

var app = express();
var port = process.env.port || 3000;

// ROUTES FOR OUR API
// get an instance of the express Router
var loaderRouter = require('./Routes/patientRoutes')(knex);

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api',loaderRouter)    

app.get('/',function(req,res){
    res.send('welcome to webapi!');
});

// START THE SERVER
app.listen(port,function(){
    console.log('Gulp is running my app on port:' + port)
})





