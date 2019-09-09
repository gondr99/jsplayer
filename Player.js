const REPEATMODE = {
    "NO":0,
    "ONE":1,
    "LIST":2
};

class Player {
    constructor(el, app){
        this.app = app;
        this.playerDom = document.querySelector(el);
        this.audio = this.playerDom.querySelector("audio");
        this.playBtn = this.playerDom.querySelector(".play");
        this.stopBtn = this.playerDom.querySelector(".stop");

        this.progressBar = this.playerDom.querySelector(".bar");

        this.currentSpan = this.playerDom.querySelector(".current-time");
        this.totalSpan = this.playerDom.querySelector(".total-time");

        this.progress = this.playerDom.querySelector(".progress");

        this.fileName = this.playerDom.querySelector(".file-name");
        this.playList = null; //플레이리스트 차후 연결
        this.playable = false; //재생 가능한지 여부 
        this.repeatMode = REPEATMODE.NO;

        this.modeBtnList = document.querySelectorAll(".repeat-btn");

        this.addListener();
        requestAnimationFrame(this.frame.bind(this));
    }

    loadMusic(musicFile){
        let fileURL = URL.createObjectURL(musicFile);
        this.audio.src = fileURL;
        this.audio.addEventListener("loadeddata", ()=>{
            this.audio.pause();
            this.fileName.innerHTML = musicFile.name;
            this.playable = true;
            this.play();
        });
    }

    addListener(){
        this.playBtn.addEventListener("click",  this.play.bind(this));
        this.stopBtn.addEventListener("click",  this.stop.bind(this));
        this.progress.addEventListener("click", this.changeSeeking.bind(this));
        this.audio.addEventListener("ended", this.musicEnd.bind(this));

        this.modeBtnList.forEach(btn => {
            btn.addEventListener("click", (e) => {
                this.repeatMode = e.target.value * 1;
            });
        })
    }

    musicEnd(){
        if(this.repeatMode == REPEATMODE.ONE){
            this.audio.currentTime = 0;
            this.audio.play();
        }else if(this.repeatMode == REPEATMODE.LIST){
            this.app.playList.getNextMusic(true);
        }else if(this.repeatMode == REPEATMODE.NO ){
            this.app.playList.getNextMusic(false);
        }
    }

    changeSeeking(e){
        if(!this.playable) return;
        let target = e.offsetX / this.progress.clientWidth * this.audio.duration;
        this.audio.currentTime = target;
    }

    play(){
        if(!this.playable) return;
        this.audio.play();
    }

    stop(){
        if(!this.playable) return;
        this.audio.pause();
    }

    frame(timestamp){
        requestAnimationFrame(this.frame.bind(this));
        this.render();
    }

    render(){
        if(!this.playable) return;
        let current = this.audio.currentTime;
        let duration = this.audio.duration;
        this.progressBar.style.width = `${current / duration * 100}%`;

        this.currentSpan.innerHTML = current.timeFormat();
        this.totalSpan.innerHTML = duration.timeFormat();
    }

    setList(playList){
        this.playList = playList;
    }
}