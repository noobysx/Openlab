var ismp4 = /.mp4$/;
document.getElementById("filebutton").onchange = function(){
    var file = document.getElementById("filebutton").files[0];
    if(file && ismp4.test(file.name)){
        var url = URL.createObjectURL(file);//获取录音时长
        var audioElement = new Audio(url);//audio也可获取视频的时长
        var duration;
        audioElement.addEventListener("loadedmetadata", function (_event) {
            duration = audioElement.duration;
            console.log(duration);
        });
    }
}