document.getElementById("searchinputconfirm").onclick = function(){
    var str = document.getElementById("searchinputtext").value;
    var xhr = new XMLHttpRequest();
    var data;
    xhr.open("GET","/query?wd="+str);
    xhr.send();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            let res = document.getElementsByClassName("result");
            let resbox = document.getElementById("resultbox");
            for(let i=res.length-1; i>=0; --i){
                res[i].remove();
            }
            if(xhr.status >= 200 && xhr.status<300){
                data = JSON.parse(xhr.response);
                for(let i=0; i<data.length; ++i){
                    let ans = document.createElement("div");
                    ans.className = "result";
                    resbox.appendChild(ans);
                    ans.innerHTML = "<a href='/question?isq=0&id="+data[i].id+
                    "'><span style='color:rgb(0,255,127);'>"+data[i].datetime+
                    "</span>&nbsp;<span style='color:red;'>BY</span>&nbsp;"+data[i].asker+
                    "&nbsp;<span style='color:red;'>ANSWERS</span>&nbsp;"+data[i].ansctr+
                    "<br/><span style='color:red;'>TITLE</span>&nbsp;<b>"+
                    data[i].title+"</b><br/>"+data[i].text+"</a>";
                }
            }
        }
    }
}
