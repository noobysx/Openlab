document.getElementById("submitq").onclick = function(){
    let name = document.getElementById("name").value;
    let title = document.getElementById("title").value;
    let text = document.getElementById("questext").value;
    let xhr = new XMLHttpRequest();
    xhr.open("POST","/insert?type=1");
    let tmp = '(asker,title,text,datetime,ansctr) values ("'+name+'","'+title+'","'+text+'",now(),0)';
    xhr.send(tmp);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status >= 200 && xhr.status<300){
                window.alert("POST QUESTION SUCCESS!");
            }
        }
    }
}