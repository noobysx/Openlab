var ifDark = false;
var speed = 1;
const cn = ["video-title","name","title","reply-content","username","rec-title","desc-info-text"];
onkeydown = function(e){
    if(e.key == '\\'){
        ifDark = !ifDark;
    }else if(e.key == '['){
        speed -= 0.2;
    }else if(e.key == ']'){
        speed += 0.2;
    }
    if(ifDark){
        for(let j=0; j<cn.length; ++j){
            let tmp = document.getElementsByClassName(cn[j]);
            for(let i=0; i<tmp.length; ++i)
                tmp[i].style.color = "#ffffff";
        }
        document.getElementById("app").style.background = "#000000";
        document.querySelector("#comment > div > div > div").style.background = "#000000";
        document.querySelector("#biliMainHeader > div").style.display = "none";
    }else{
        for(let j=0; j<cn.length; ++j){
            let tmp = document.getElementsByClassName(cn[j]);
            for(let i=0; i<tmp.length; ++i)
                tmp[i].style.color = "#000000";
        }
        document.getElementById("app").style.background = "";
        document.querySelector("#comment > div > div > div").style.background = "";
        document.querySelector("#biliMainHeader > div").style.display = "";
    }
    let menu = document.getElementsByClassName("bpx-player-ctrl-playbackrate-menu")[0];
    menu.innerHTML = '<li class="bpx-player-ctrl-playbackrate-menu-item" data-value="'+speed+'">'+speed+'x</li>'+
                    '<li class="bpx-player-ctrl-playbackrate-menu-item" data-value="2">2.0x</li><li class="bpx-player\
                    -ctrl-playbackrate-menu-item" data-value="1.5">1.5x</li><li class="bpx-player-ctrl-playbackrate-menu-item"\
                     data-value="1.25">1.25x</li><li class="bpx-player-ctrl-playbackrate-menu-item" data-value="1">1.0x</li>\
                     <li class="bpx-player-ctrl-playbackrate-menu-item" data-value="0.75">0.75x</li>\
                     <li class="bpx-player-ctrl-playbackrate-menu-item" data-value="0.5">0.5x</li>'
    console.log("Success to execute the extension.");
}