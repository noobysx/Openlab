var xhr = new XMLHttpRequest();
var xhrq = new XMLHttpRequest();
var data;
var question;
var id = window.location.href.split("id=")[1];
xhrq.open("GET","/query?id="+id);
xhrq.send();
xhrq.onreadystatechange = function(){
    if(xhrq.readyState === 4){
        if(xhrq.status >=200 && xhrq.status<300){
            question = JSON.parse(xhrq.response);
            document.getElementById("questionbox").innerHTML = 
                "<b style='color:red;'>QUESTION</b>&nbsp;<span style='color:rgb(0,255,127);'>"+
                question[0].datetime+"</span>&nbsp;<span style='color:red;'>BY</span>&nbsp;"+
                question[0].asker+"&nbsp;<span style='color:red;'>ANSWERS</span>&nbsp;"+
                question[0].ansctr+"<br/><span style='color:red;'>TITLE</span>&nbsp;<b>"+
                question[0].title+"</b><br/>"+question[0].text+"</a>";
        }
    }
}
xhr.open("GET","/question?isq=1&id="+id);
xhr.send();
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
        let res = document.getElementsByClassName("result");
        let resbox = document.getElementById("resultbox");
        if(xhr.status >= 200 && xhr.status<300){
            data = JSON.parse(xhr.response);
            for(let i=0; i<data.length; ++i){
                let ans = document.createElement("div");
                ans.className = "result";
                resbox.appendChild(ans);
                ans.innerHTML = "<span style='color:red;'>ANSWER&nbsp;"+(i+1)+
                    "</span>&nbsp;<span style='color:rgb(0,255,127);'>"+data[i].datetime+
                    "</span>&nbsp;<span style='color:red;'>BY</span>&nbsp;"+data[i].answerer+
                    "&nbsp;<br/>"+data[i].text;
            }
        }
    }
}
document.getElementById("submita").onclick = function(){
    let name = document.getElementById("name").value;
    let text = document.getElementById("anstext").value;
    let xhr = new XMLHttpRequest();
    xhr.open("POST","/insert?type=2&qid="+id);
    let tmp = '(answerer,text,datetime,questionid) values ("'+name+'","'+text+'",now(),'+id+')';
    xhr.send(tmp);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status >= 200 && xhr.status<300){
                window.alert("POST ANSWER SUCCESS!");
            }
        }
    }
}