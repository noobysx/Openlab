const express = require('express');
const fs = require('fs');
const mysql = require('mysql');
const app = express();
app.use(express.static('../public'));
app.get('/',(req,resp)=>{
    fs.readFile('../public/index.htm', (err,data)=>{
        if(!err){
            resp.write(data);
        }
        resp.end();
    })
});
app.get('/upload',(req,resp)=>{//discarded
    fs.readFile('../public/upload.htm', (err,data)=>{
        if(!err){
            resp.write(data);
        }
        resp.end();
    })
});
app.get('/player',(req,resp)=>{
    fs.readFile('../public/player.htm', (err,data)=>{
        if(!err){
            resp.write(data);
        }
        resp.end();
    })
})
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'mydb',
    timezone : 'utc' 
});
connection.connect();
app.get('/query',(req,resp)=>{
    let reg = req.query.wd;
    //resp.setHeader("Access-Control-Allow-Origin","*");
    connection.query('SELECT * FROM mydb.videoinfo WHERE caption REGEXP "'+reg+
        '" OR summary REGEXP "'+reg+'" ORDER BY videoid DESC',function (error, results) {
        if (error) throw error;
        resp.send(results);
        resp.end();
    });
});
app.get('/barrage',(req,resp)=>{
    let id = req.query.id;
    connection.query('SELECT * FROM mydb.barrage WHERE videoid='+id+' ORDER BY time',function (error, results) {
        if (error) throw error;
        resp.send(results);
        resp.end();
    });
});
app.post('/barrage',(req,resp)=>{
    let tmp = "";
    req.on('data', (chunk)=>{
        tmp += chunk;
    });
    req.on('end', ()=>{
        let cmd = 'INSERT INTO mydb.barrage'+tmp;
        connection.query(cmd);
        resp.end();
    })
});
app.get('/download',(req,resp)=>{
    resp.download(process.cwd()+'/../public/'+req.query.url);
});
app.listen(8888,()=>{
    console.log("Serving");
});