class PlayList {
    constructor(el, app){
        this.player = app.player;
        this.listDom = document.querySelector(el);
        this.itemList = this.listDom.querySelector(".item-list");
        this.addBtn = this.listDom.querySelector("#openDialog"); //추가 버튼
        this.fileInput = this.listDom.querySelector("#audioFile");

        this.itemList.innerHTML = "";

        this.fileList = [];

        this.addListener(); //이벤트 바인딩
    }

    addListener(){
        this.addBtn.addEventListener("click", e => this.fileInput.click());
        this.fileInput.addEventListener("change", this.addList.bind(this));
    }

    addList(e){
        //여기서 추가하는 파일이 mp3파일인지 검사를 반드시 해줘야 한다.
        let obj = {idx:this.fileList.length, file:e.target.files[0]};
        this.fileList.push(obj);
        let item = document.createElement("li");
        item.classList.add("item");
        item.dataset.idx = obj.idx;
        item.addEventListener("dblclick", (e)=>{
            let idx = e.target.dataset.idx;
            let data = this.fileList.find( x => x.idx == idx);

            let items = document.querySelectorAll("#playList .item");
            items.forEach(x => {
                x.classList.remove("active");
            });
            item.classList.add("active");
            this.player.loadMusic(data.file);
        });
        item.innerHTML = obj.file.name;

        this.itemList.appendChild(item);
    }
}