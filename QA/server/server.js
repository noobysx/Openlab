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
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'qa',
    timezone : 'utc' 
});
connection.connect();
app.get('/query',(req,resp)=>{
    let id = req.query.id;
    if(id === undefined){
        let reg = req.query.wd;
        connection.query('SELECT * FROM QA.question WHERE title REGEXP "'+reg+'" ORDER BY id DESC',function(error, results){
            if (error) throw error;
            resp.send(results);
            resp.end();
        });
    }else{
        connection.query('SELECT * FROM QA.question WHERE id='+id,function(error, results){
            if (error) throw error;
            resp.send(results);
            resp.end();
        });
    }
});
app.get('/question',(req,resp)=>{
    if(req.query.isq != "0"){
        connection.query('SELECT * FROM QA.answer WHERE questionid='+req.query.id+' ORDER BY id DESC',function(error,results){
            if(error) throw error;
            resp.send(results);
            resp.end();
        });
    }else{
        fs.readFile('../public/question.htm', (err,data)=>{
            if(!err){
                resp.write(data);
            }
            resp.end();
        })
    }
});
app.post('/insert',(req,resp)=>{
    let tmp = "";
    req.on('data', (chunk)=>{
        tmp += chunk;
    })
    if(req.query.type === '1'){
        req.on('end', ()=>{
            let cmd = 'INSERT INTO question'+tmp;
            connection.query(cmd);
            resp.end();
        })
    }else if(req.query.type === '2'){
        let id = parseInt(req.query.qid);
        req.on('end', ()=>{
            let ansctr = undefined;
            connection.query('INSERT INTO answer'+tmp);
            connection.query('SELECT ansctr FROM question WHERE id='+id, (err,res)=>{
                ansctr = parseInt(res[0].ansctr);
                ansctr = ansctr+1;
                connection.query('UPDATE question SET ansctr='+ansctr+' WHERE id='+id);
                resp.end();
            });
        })
    }
})
app.listen(8848,()=>{
    console.log("Serving");
});