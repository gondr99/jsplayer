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
        this.fileInput.addEventListener("change", this.inputChange.bind(this));

        this.listDom.addEventListener("dragover", this.fileDragOver.bind(this));
        this.listDom.addEventListener("drop", this.fileDrop.bind(this));

        this.itemList.addEventListener("drop", this.itemDrop.bind(this));
    }

    itemDrop(e){
        let data = e.dataTransfer.getData("idx");
        console.log(data);
        if(data != ""){
            //내용을 드래그시
            e.stopPropagation();
            e.preventDefault();

            let y = e.clientY; //마우스가 드랍된 곳의 y좌표를 구한다.
            let target = -1;
            for(let i = 0; i < this.fileList.length; i++){
                if(this.fileList[i].dom.offsetTop > y){
                    target = i;
                    break;
                }
            }
            let moveItem = this.fileList.find(x => x.idx == data*1 );
            if(target == -1) {
                this.itemList.appendChild(moveItem.dom);
            } else{
                this.itemList.insertBefore(moveItem.dom, this.fileList[target].dom);
            }            
        }
    }

    fileDragOver(e){
        e.stopPropagation();
        e.preventDefault();
        //console.log(e);
    }

    fileDrop(e){
        e.stopPropagation();
        e.preventDefault();
        
        let files = Array.from(e.dataTransfer.files);
        this.addList(files);
    }

    inputChange(e){
        this.addList(Array.from(e.target.files));
    }

    addList(files) {
        //여기서 추가하는 파일이 mp3파일인지 검사를 반드시 해줘야 한다.               
        files.forEach(file => {
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

            //dragand drop을 위한 코드
            item.setAttribute("draggable", true); //드래그 가능하도록
            item.addEventListener("dragstart", (e)=>{
                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setData("idx", obj.idx);
                e.dataTransfer.setDragImage(e.target, 0, 0);
            });

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