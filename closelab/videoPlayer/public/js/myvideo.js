//var videoWidth = 900;
var asideWidth = 360;
var minWidth = 500;////
var maxWidth = 1400;
var WaH;
var isSmall = false;
var smallWidth = 300;
var isWideScreen = false;
var isTheater = false;
var haveHour = false;
var ctid;
var progressWidth;
var progressClock;/////
var volumeWidth = 60;
var curPos = 60;
var halfslider = 6;
var rflag = false;
var vdurl;///////
var video = document.getElementById("vd");
var barrageData;
var isBarrageReady = false;
video.src = window.location.href.split("url=")[1];
function setSize(){
    var awidth;
    if(isWideScreen){
        awidth = 0;
    }else{
        awidth = asideWidth;
    }
    var dw = 260;//////
    var width = document.body.clientWidth - awidth - dw;
    if(width < minWidth+dw){
        width = minWidth+dw;
    }else if(width > maxWidth+dw){
        width = maxWidth+dw;
    }
    var height = width/WaH;
    video.width = width;
    video.height = height;
    progressWidth = width;
    document.getElementById("playwindow").style.width = width+20+awidth+"px";
    document.getElementById("playbox").style.width = width+"px";
    document.getElementById("playbox").style.height = height+48+"px";
    document.getElementById("videobox").style.height = height+"px";
    document.getElementById("progress").style.width = width+"px";
    document.getElementById("maside").style.width = asideWidth+"px";
    document.getElementById("vplay").style.width = width+"px";
    document.getElementById("vplay").style.height = height+"px";
}
video.oncanplay = function(){
    getBarrage();
    WaH = video.clientWidth/video.clientHeight;
    setSize();
    var dtime = video.duration;
    haveHour = dtime >= 3600;
    document.getElementById("dtime").innerHTML = makeTime(dtime);
    curTime();
}
window.addEventListener("resize",function(){
    if(!isSmall){
        setSize();
    }
})
function setSmall(){
    if(isSmall) return;
    isSmall = true;
    var height = smallWidth/WaH;
    video.width = smallWidth;
    video.height = height;
    var videobox = document.getElementById("videobox");
    videobox.className = "videobox vsmall";
    videobox.style.width = smallWidth+"px";
    videobox.style.height = height+"px";
    document.getElementById("vplay").style.width = smallWidth+"px";
    document.getElementById("vplay").style.height = height+"px";
}
function exitSmall(){
    if(!isSmall) return;
    isSmall = false;
    document.getElementById("videobox").className = "videobox";
    setSize();
}
window.addEventListener("scroll",function(){
    var playbox = document.getElementById("playbox");
    var height = parseInt(playbox.style.height) + playbox.offsetTop;
    var top = document.documentElement.scrollTop;
    if(top > height-50){
        setSmall();
    }else{
        exitSmall();
    }
})
document.getElementById("fullscreen").onclick = function(){
    if(video.requestFullscreen){
        video.requestFullscreen();
    }else{
        console.log("The browser doesn't support 'video.requestFullscreen()'");
    }
}
document.getElementById("widescreen").onclick = function(){
    isWideScreen = !isWideScreen;
    if(isWideScreen){
        this.className = "nowidescreen";
        this.title = "Exit Wide Screen";
        document.getElementById("maside").style.display = "none";
    }else{
        this.className = "widescreen";
        this.title = "Wide Screen";
        document.getElementById("maside").style.display = "flex";
    }
    setSize();
}
document.getElementById("theatermode").onclick = function(){
    isTheater = !isTheater;
    var fullback = document.getElementById("fullback");
    if(!isTheater){
        this.title = "Theater Mode";
        fullback.style = "";
        fullback.className = "fullback";
    }else{
        this.title = "Exit Theater Mode";
        fullback.style.width = document.body.clientWidth+"px";
        fullback.style.height = document.body.clientHeight+"px";
        fullback.className = "fullback theater";
    }
}
function play(){
    document.getElementById("play").className = "pause";
    document.getElementById("vplay").className = "vpause";
    video.play();
    ctid = setInterval(function(){
        curTime();
    },1000);
    progressClock = setInterval(function(){
        setProgress();
    },100);
}
function pause(){
    document.getElementById("play").className = "play";
    document.getElementById("vplay").className = "vplay";
    video.pause();
    clearInterval(ctid);
    clearInterval(progressClock);
}
document.getElementById("play").onclick = function(){
    if(video.paused){
        play();
    }else{
        pause();
    }
}
document.getElementById("vplay").onclick = function(){
    if(video.paused){
        play();
    }else{
        pause();
    }
}
function stop(){
    pause();
    video.currentTime = 0;
    curTime();
    setProgress();
}
document.getElementById("stop").onclick = function(){
    stop();
}
video.onended = function(){
    stop();
}
function makeTime(time){
    time = Math.floor(time);
    var h = Math.floor(time/3600);
    var m = Math.floor((time-h*3600)/60);
    var s = time-h*3600-m*60;
    m = m<10?"0"+m:m;
    s = s<10?"0"+s:s;
    if(haveHour){
        h = h<10?"0"+h:h;
        return h+":"+m+":"+s;
    }
    return m+":"+s;
}
function curTime(){
    document.getElementById("ctime").innerHTML = makeTime(video.currentTime);
}
function setProgress(){
    var cur = video.currentTime/video.duration*progressWidth;
    document.getElementById("now").style.width = cur+"px";
}
document.getElementById("progress").onclick = function(e){
    if(video.currentTime <= 0) return;
    var cur = e.offsetX/progressWidth;
    video.currentTime = cur*video.duration;
    document.getElementById("now").style.width = cur+"px";
}
var speedlist = document.getElementById("speed_list").getElementsByTagName("div");
for(var i in speedlist){
    speedlist[i].onclick = function(){
        var v = this.getAttribute("value");
        document.getElementById("curspeed").innerHTML = "Speed&times;"+v;
        video.playbackRate = v;
    }
}
document.getElementById("mute").onclick = function(){
    var muted = video.muted;
    if(muted){
        this.className = "mute";
        this.title = "Mute";
    }else{
        this.className = "mute muted";
        this.title = "Muted"
    }
    video.muted = !muted;
}
function setPos(pos){
    if(pos<0){
        pos = 0;
    }else if(pos>volumeWidth){
        pos = volumeWidth;
    }
    document.getElementById("vnow").style.width = pos+"px";
    document.getElementById("slider").style.left = (pos-halfslider)+"px";
    curPos = pos;
    video.volume = curPos/volumeWidth;
}
document.getElementById("volume").onclick = function(e){
    if(!rflag){
        setPos(e.offsetX);
    }
    rflag = false;
}
document.getElementById("slider").onmousedown = function(e){
    rflag = true;
    var x = e.clientX;
    document.onmousemove = function(ev){
        var ls = ev.clientX - x + curPos;
        setPos(ls/2);
    };
    document.onmouseup = function(){
        document.onmousemove = null;
    }
}
function getBarrage(){
    let id = window.location.href.split("id=")[1].split("&")[0];
    let xhr = new XMLHttpRequest();
    xhr.open("GET","/barrage?id="+id);
    xhr.send();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status >=200 && xhr.status<300){
                barrageData = JSON.parse(xhr.response);
                isBarrageReady = true;
            }
        }
    }
}
function showBarrage(){
    if(barrageData.length == 0) return;
    if(parseInt(barrageData[0].time) > video.currentTime)
        return;
    let data = barrageData.shift();
    let div = document.createElement("div");
    let mlist = document.getElementById("mlist");
    div.innerHTML = "<span>"+data.username+":</span>"+data.text;
    mlist.appendChild(div);
    mlist.scrollTop = mlist.scrollHeight;
}
video.ontimeupdate = function(){
    if(isBarrageReady)
        showBarrage();
}
document.getElementById("sbtn").onclick = function(){
    if(video.currentTime<=0) return;
    let text = document.getElementById("stext").value;
    let id = window.location.href.split("id=")[1].split("&")[0];
    if(text.length == 0) return;
    barrageData.unshift({
        time: video.currentTime,
        username: "Me",
        text: text,
        videoid: id
    });
    let tmp = '(time,username,text,videoid) values ('+video.currentTime+',"Me","'+text+'",'+id+')';
    let xhr = new XMLHttpRequest();
    xhr.open("POST","/barrage");
    xhr.send(tmp);
    document.getElementById("stext").value = "";
}
window.oncontextmenu = function(event){
    const menu = document.getElementById("rightclick");
    event.preventDefault();
    const mouseX = event.clientX+10;
    const mouseY = event.clientY+10;
    menu.style.top = mouseY+"px";
    menu.style.left = mouseX+"px";
    menu.style.display = "block";
}
window.onmousedown = function(event){
    menu = document.getElementById("rightclick");
    const mx = event.clientX+10;
    const my = event.clientY+10;
    y = menu.style.top.split("px")[0];
    x = menu.style.left.split("px")[0];
    y = parseInt(y);
    x = parseInt(x);
    if(mx>x+100 || mx<x || my>y+50 || my<y){
        document.getElementById("rightclick").style.display = "none";
    }
}
document.getElementById("rightclick").onclick = function(){
    handleDownload();
}
function handleDownload() {
    let link = "/download?url="+window.location.href.split("url=")[1];
    let fileName = 'Download.mp4';
    let xhr = new XMLHttpRequest();
    xhr.open('GET', link, true);
    xhr.responseType = 'blob';
    xhr.onload = (e) => {
      let url = window.URL.createObjectURL(xhr.response)
      let a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
    }
    xhr.send();
}