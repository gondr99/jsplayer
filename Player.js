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

        this.canvas = this.playerDom.querySelector("#vCanvas");
        this.ctx = this.canvas.getContext("2d");

        const visual = this.playerDom.querySelector(".visualizer");
        this.canvas.width = visual.clientWidth;
        this.canvas.height = visual.clientHeight;

        this.aCtx = new AudioContext();
        this.analyser = null;
        this.dataArray = null;
        this.barHeight = 0;
        this.x = 0;
        this.barWidth = null; //캔버스에 그려줄 바의 너비

        this.addListener();
        this.initVisual();
        requestAnimationFrame(this.frame.bind(this));
    }

    initVisual(){
        let src = this.aCtx.createMediaElementSource(this.audio); //오디오 태그로 부터 불러와서
        const analyser = this.analyser = this.aCtx.createAnalyser();
        src.connect(this.aCtx.destination);
        src.connect(analyser);
        //시각화를 위해 분석기에다가도 소스를 연결해줌.
        analyser.fftSize = 8192;

        //FFT 는 알고리즘의 이름으로 시간을 피리어드로 나눠 해당 피리어드별 프리퀀시를 만들어준다.
        //여기에 들어가는 fftSize 변수는 낮으면 작은 사이즈의 값을 리턴하게 된다.

        //여기서부터의 코드는 시간대별 음역 막대 그리기 코드이다.
        const W = this.canvas.width;
        const bufferLength = analyser.frequencyBinCount; //Read-only 프로퍼티
        // unsigned int형으로 리턴한다. fftSize의 절반으로 여기서는 8192가 된다.
        this.barWidth = (W / (bufferLength + 1));
        this.dataArray = new Uint8Array(bufferLength); //버퍼 길이만큼 Uint8Array를 생성
        //캔버스에 그려줄 Bar의 너비
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

        const W = this.canvas.width;
        const H = this.canvas.height;
        //console.log(W, H, this.barWidth);
        let x = 0;
        this.analyser.getByteFrequencyData(this.dataArray); //현재 프리퀀시의 데이터가 넘어온다.
        const ctx = this.ctx;

        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillRect(0, 0, W, H);

        for (let i = 0; i < this.dataArray.length; i++) {
            this.barHeight = this.dataArray[i] * 1;            
            ctx.fillStyle = this.getColorString(this.dataArray[i], H);
            ctx.fillRect(x, (H - this.barHeight), this.barWidth, this.barHeight);
            x += this.barWidth+1;
        }
    }

    getColorString(value, H) {
        let p = value / H;
        if (p > 0.8) {
            return "rgb(250, 0, 255)";
        } else if (p > 0.7) {
            return "rgb(250, 255, 0)";
        } else if (p > 0.5) {
            return "rgb(204, 255, 0)";
        } else if (p > 0.4) {
            return "rgb(0, 219, 131)";
        } else if (p > 0.3) {
            return "rgb(0, 199, 255)";
        } else if (p > 0.2) {
            return "rgb(0, 12, 255)";
        } else {
            return "rgb(0, 0, 255)";
        }
    }

    setList(playList){
        this.playList = playList;
    }
}