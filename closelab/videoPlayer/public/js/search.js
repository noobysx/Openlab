document.getElementById("searchinputconfirm").onclick = function(){
    var str = document.getElementById("searchinputtext").value;
    var xhr = new XMLHttpRequest();
    var data;
    xhr.open("GET","/query?wd="+str);
    xhr.send();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            let tmp = document.getElementsByClassName("result");
            for(let i=tmp.length-1; i>=0; --i){
                tmp[i].remove();
            }
            if(xhr.status >= 200 && xhr.status<300){
                 data = JSON.parse(xhr.response);
                 for(let i=0; i<data.length; ++i){
                    let x = document.createElement("div");
                    document.getElementById("resultbox").appendChild(x);
                    x.className = "result";
                    x.title = data[i].summary;
                    x.innerHTML = "<a href=/player?id="+data[i].videoid+"&url="+data[i].videourl+"><img width='280' height=210 src='"+
                        data[i].imgurl+"'></a><div class='resultfloat'><span style='color:red;'>["+
                        makeTime(data[i].duration)+"]</span>"+data[i].caption+"</div>";
                }
            }
        }
    }
}
//document.getElementById("upload").onclick = function(){}
function makeTime(time){
    time = Math.floor(time);
    let h = Math.floor(time/3600);
    let m = Math.floor((time-h*3600)/60);
    let s = time-h*3600-m*60;
    m = m<10?"0"+m:m;
    s = s<10?"0"+s:s;
    h = h<10?"0"+h:h;
    return h+":"+m+":"+s;
}