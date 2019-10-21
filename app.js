import { ipcRenderer, shell } from 'electron';

import "./Player.js";
import "./PlayList.js";



Number.prototype.timeFormat = function () {
    let h = "0" + Math.floor(this / 3600);
    h = h.substring(h.length - 2, h.length);
    let m = "0" + Math.floor(this % 3600 / 60);
    m = m.substring(m.length - 2, m.length);
    let s = "0" + Math.floor(this % 60);
    s = s.substring(s.length - 2, s.length);
    return `${h} : ${m} : ${s}`;
};

class App {
    constructor(playerEl, listEL) {
        this.player = new Player(playerEl, this);
        this.playList = new PlayList(listEL, this);
    }
}

window.addEventListener("load", () => {
    let app = new App("#player", "#playList");
});

window.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key.toLowerCase() == "q") {
        ipcRenderer.send("openDev");
    }
});