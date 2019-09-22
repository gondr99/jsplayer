class PlayList {
    constructor(el, app) {
        this.player = app.player;
        this.listDom = document.querySelector(el);
        this.itemList = this.listDom.querySelector(".item-list");
        this.addBtn = this.listDom.querySelector("#openDialog"); //추가 버튼
        this.fileInput = this.listDom.querySelector("#audioFile");

        this.itemList.innerHTML = "";
        this.fileList = [];
        this.playIdx = null; //현재 재생중인 음악의 인덱스
        this.addListener(); //이벤트 바인딩
    }

    addListener() {
        this.addBtn.addEventListener("click", e => this.fileInput.click());
        this.fileInput.addEventListener("change", this.addList.bind(this));
    }

    addList(e) {
        //여기서 추가하는 파일이 mp3파일인지 검사를 반드시 해줘야 한다.               
        Array.from(e.target.files).forEach(file => {
            if(file.type.substring(0, 5) !== "audio") {
                //오디오파일이 아니면 추가하지 않는다.
                return;
            }
            let obj = { idx: this.fileList.length, file: file, dom: null };
            this.fileList.push(obj);
            let item = document.createElement("li");
            item.classList.add("item");
            obj.dom = item; //돔 연결
            item.dataset.idx = obj.idx;
            item.addEventListener("dblclick", (e) => {
                let idx = e.target.dataset.idx;
                let data = this.fileList.find(x => x.idx == idx);
                this.playItem(data);
            });
            item.innerHTML = obj.file.name;

            this.itemList.appendChild(item);
        });
    }

    playItem(data) {
        let items = document.querySelectorAll("#playList .item");
        items.forEach(x => {
            x.classList.remove("active");
        });
        data.dom.classList.add("active");
        this.playIdx = data.idx; //현재 플레이중이 플레이리스트
        this.player.loadMusic(data.file);
    }

    getNextMusic(loop) {
        let currentIdx = this.fileList.findIndex(x => x.idx == this.playIdx);
        if (currentIdx < this.fileList.length - 1) {
            this.playItem(this.fileList[currentIdx + 1]);
        }else if(loop) {
            this.playItem(this.fileList[0]);
        }
    }
}