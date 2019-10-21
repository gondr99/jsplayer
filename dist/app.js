/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./PlayList.js":
/*!*********************!*\
  !*** ./PlayList.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class PlayList {\r\n    constructor(el, app) {\r\n        this.player = app.player;\r\n        this.listDom = document.querySelector(el);\r\n        this.itemList = this.listDom.querySelector(\".item-list\");\r\n        this.addBtn = this.listDom.querySelector(\"#openDialog\"); //추가 버튼\r\n        this.fileInput = this.listDom.querySelector(\"#audioFile\");\r\n\r\n        this.itemList.innerHTML = \"\";\r\n        this.fileList = [];\r\n        this.playIdx = null; //현재 재생중인 음악의 인덱스\r\n        this.addListener(); //이벤트 바인딩\r\n\r\n    }\r\n\r\n    addListener() {\r\n        this.addBtn.addEventListener(\"click\", e => this.fileInput.click());\r\n        this.fileInput.addEventListener(\"change\", this.inputChange.bind(this));\r\n\r\n        this.listDom.addEventListener(\"dragover\", this.fileDragOver.bind(this));\r\n        this.listDom.addEventListener(\"drop\", this.fileDrop.bind(this));\r\n\r\n        this.itemList.addEventListener(\"drop\", this.itemDrop.bind(this));\r\n    }\r\n\r\n    itemDrop(e){\r\n        let data = e.dataTransfer.getData(\"idx\");\r\n        console.log(data);\r\n        if(data != \"\"){\r\n            //내용을 드래그시\r\n            e.stopPropagation();\r\n            e.preventDefault();\r\n\r\n            let y = e.clientY; //마우스가 드랍된 곳의 y좌표를 구한다.\r\n            let target = -1;\r\n            for(let i = 0; i < this.fileList.length; i++){\r\n                if(this.fileList[i].dom.offsetTop > y){\r\n                    target = i;\r\n                    break;\r\n                }\r\n            }\r\n            let moveItem = this.fileList.find(x => x.idx == data*1 );\r\n            if(target == -1) {\r\n                this.itemList.appendChild(moveItem.dom);\r\n            } else{\r\n                this.itemList.insertBefore(moveItem.dom, this.fileList[target].dom);\r\n            }            \r\n        }\r\n    }\r\n\r\n    fileDragOver(e){\r\n        e.stopPropagation();\r\n        e.preventDefault();\r\n        //console.log(e);\r\n    }\r\n\r\n    fileDrop(e){\r\n        e.stopPropagation();\r\n        e.preventDefault();\r\n        \r\n        let files = Array.from(e.dataTransfer.files);\r\n        this.addList(files);\r\n    }\r\n\r\n    inputChange(e){\r\n        this.addList(Array.from(e.target.files));\r\n    }\r\n\r\n    addList(files) {\r\n        //여기서 추가하는 파일이 mp3파일인지 검사를 반드시 해줘야 한다.               \r\n        files.forEach(file => {\r\n            if(file.type.substring(0, 5) !== \"audio\") {\r\n                //오디오파일이 아니면 추가하지 않는다.\r\n                return;\r\n            }\r\n            let obj = { idx: this.fileList.length, file: file, dom: null };\r\n            this.fileList.push(obj);\r\n            let item = document.createElement(\"li\");\r\n            item.classList.add(\"item\");\r\n            obj.dom = item; //돔 연결\r\n            item.dataset.idx = obj.idx;\r\n\r\n            //dragand drop을 위한 코드\r\n            item.setAttribute(\"draggable\", true); //드래그 가능하도록\r\n            item.addEventListener(\"dragstart\", (e)=>{\r\n                e.dataTransfer.effectAllowed = \"move\";\r\n                e.dataTransfer.setData(\"idx\", obj.idx);\r\n                e.dataTransfer.setDragImage(e.target, 0, 0);\r\n            });\r\n\r\n            item.addEventListener(\"dblclick\", (e) => {\r\n                let idx = e.target.dataset.idx;\r\n                let data = this.fileList.find(x => x.idx == idx);\r\n                this.playItem(data);\r\n            });\r\n            item.innerHTML = obj.file.name;\r\n\r\n            this.itemList.appendChild(item);\r\n        });\r\n    }\r\n\r\n    playItem(data) {\r\n        let items = document.querySelectorAll(\"#playList .item\");\r\n        items.forEach(x => {\r\n            x.classList.remove(\"active\");\r\n        });\r\n        data.dom.classList.add(\"active\");\r\n        this.playIdx = data.idx; //현재 플레이중이 플레이리스트\r\n        this.player.loadMusic(data.file);\r\n    }\r\n\r\n    getNextMusic(loop) {\r\n        let currentIdx = this.fileList.findIndex(x => x.idx == this.playIdx);\r\n        if (currentIdx < this.fileList.length - 1) {\r\n            this.playItem(this.fileList[currentIdx + 1]);\r\n        }else if(loop) {\r\n            this.playItem(this.fileList[0]);\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack:///./PlayList.js?");

/***/ }),

/***/ "./Player.js":
/*!*******************!*\
  !*** ./Player.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const REPEATMODE = {\r\n    \"NO\":0,\r\n    \"ONE\":1,\r\n    \"LIST\":2\r\n};\r\n\r\nclass Player {\r\n    constructor(el, app){\r\n        this.app = app;\r\n        this.playerDom = document.querySelector(el);\r\n        this.audio = this.playerDom.querySelector(\"audio\");\r\n        this.playBtn = this.playerDom.querySelector(\".play\");\r\n        this.stopBtn = this.playerDom.querySelector(\".stop\");\r\n\r\n        this.progressBar = this.playerDom.querySelector(\".bar\");\r\n\r\n        this.currentSpan = this.playerDom.querySelector(\".current-time\");\r\n        this.totalSpan = this.playerDom.querySelector(\".total-time\");\r\n\r\n        this.progress = this.playerDom.querySelector(\".progress\");\r\n\r\n        this.fileName = this.playerDom.querySelector(\".file-name\");\r\n        this.playList = null; //플레이리스트 차후 연결\r\n        this.playable = false; //재생 가능한지 여부 \r\n        this.repeatMode = REPEATMODE.NO;\r\n\r\n        this.modeBtnList = document.querySelectorAll(\".repeat-btn\");\r\n\r\n        this.canvas = this.playerDom.querySelector(\"#vCanvas\");\r\n        this.ctx = this.canvas.getContext(\"2d\");\r\n\r\n        const visual = this.playerDom.querySelector(\".visualizer\");\r\n        \r\n        this.canvas.width = visual.clientWidth;\r\n        this.canvas.height = visual.clientHeight;\r\n\r\n        this.aCtx = null;\r\n        this.analyser = null;\r\n        this.dataArray = null;\r\n        this.barHeight = 0;\r\n        this.x = 0;\r\n        this.barWidth = null; //캔버스에 그려줄 바의 너비\r\n\r\n        this.addListener();\r\n        requestAnimationFrame(this.frame.bind(this));\r\n    }\r\n\r\n    initVisual(){\r\n        this.aCtx = new AudioContext();\r\n        let src = this.aCtx.createMediaElementSource(this.audio); //오디오 태그로 부터 불러와서\r\n        const analyser = this.analyser = this.aCtx.createAnalyser();\r\n        src.connect(this.aCtx.destination);\r\n        src.connect(analyser);\r\n        //시각화를 위해 분석기에다가도 소스를 연결해줌.\r\n        analyser.fftSize = 512;\r\n\r\n        //FFT 는 알고리즘의 이름으로 시간을 피리어드로 나눠 해당 피리어드별 프리퀀시를 만들어준다.\r\n        //여기에 들어가는 fftSize 변수는 낮으면 작은 사이즈의 값을 리턴하게 된다.\r\n\r\n        //여기서부터의 코드는 시간대별 음역 막대 그리기 코드이다.\r\n        const W = this.canvas.width;\r\n        const bufferLength = analyser.frequencyBinCount; //Read-only 프로퍼티\r\n        // unsigned int형으로 리턴한다. fftSize의 절반으로 여기서는 8192가 된다.\r\n        this.barWidth = (W / (bufferLength + 1));\r\n        this.dataArray = new Uint8Array(bufferLength); //버퍼 길이만큼 Uint8Array를 생성\r\n        //캔버스에 그려줄 Bar의 너비\r\n    }\r\n\r\n    loadMusic(musicFile){\r\n        if(this.aCtx == null){\r\n            this.initVisual();\r\n        }\r\n        let fileURL = URL.createObjectURL(musicFile);\r\n        this.audio.src = fileURL;\r\n        this.audio.addEventListener(\"loadeddata\", ()=>{\r\n            this.audio.pause();\r\n            this.fileName.innerHTML = musicFile.name;\r\n            this.playable = true;\r\n\r\n            this.play();\r\n        });\r\n    }\r\n\r\n    addListener(){\r\n        this.playBtn.addEventListener(\"click\",  this.play.bind(this));\r\n        this.stopBtn.addEventListener(\"click\",  this.stop.bind(this));\r\n        this.progress.addEventListener(\"click\", this.changeSeeking.bind(this));\r\n        this.audio.addEventListener(\"ended\", this.musicEnd.bind(this));\r\n\r\n        this.modeBtnList.forEach(btn => {\r\n            btn.addEventListener(\"click\", (e) => {\r\n                this.repeatMode = e.target.value * 1;\r\n            });\r\n        })\r\n    }\r\n\r\n    musicEnd(){\r\n        if(this.repeatMode == REPEATMODE.ONE){\r\n            this.audio.currentTime = 0;\r\n            this.audio.play();\r\n        }else if(this.repeatMode == REPEATMODE.LIST){\r\n            this.app.playList.getNextMusic(true);\r\n        }else if(this.repeatMode == REPEATMODE.NO ){\r\n            this.app.playList.getNextMusic(false);\r\n        }\r\n    }\r\n\r\n    changeSeeking(e){\r\n        if(!this.playable) return;\r\n        let target = e.offsetX / this.progress.clientWidth * this.audio.duration;\r\n        this.audio.currentTime = target;\r\n    }\r\n\r\n    play(){\r\n        if(!this.playable) return;\r\n        if(this.audio.paused){\r\n            this.audio.play();\r\n            this.playBtn.innerHTML = `<i class=\"fas fa-pause\"></i>`;\r\n        }else {\r\n            this.audio.pause();\r\n            this.playBtn.innerHTML = `<i class=\"fas fa-play\"></i>`;\r\n        }\r\n        \r\n    }\r\n\r\n    stop(){\r\n        if(!this.playable) return;\r\n        this.audio.pause();\r\n        this.audio.currentTime = 0;\r\n        this.playBtn.innerHTML = `<i class=\"fas fa-play\"></i>`;\r\n    }\r\n\r\n    frame(timestamp){\r\n        requestAnimationFrame(this.frame.bind(this));\r\n        this.render();\r\n    }\r\n\r\n    render(){\r\n        if(!this.playable) return;\r\n        let current = this.audio.currentTime;\r\n        let duration = this.audio.duration;\r\n        this.progressBar.style.width = `${current / duration * 100}%`;\r\n\r\n        this.currentSpan.innerHTML = current.timeFormat();\r\n        this.totalSpan.innerHTML = duration.timeFormat();\r\n\r\n        const W = this.canvas.width;\r\n        const H = this.canvas.height;\r\n        \r\n        let x = 0;\r\n        this.analyser.getByteFrequencyData(this.dataArray); //현재 프리퀀시의 데이터가 넘어온다.\r\n        //값은 항상 0~ 255까지의 값만이 나온다.\r\n        const ctx = this.ctx;\r\n\r\n        ctx.fillStyle = \"rgba(0,0,0,0.2)\";\r\n        ctx.fillRect(0, 0, W, H);\r\n\r\n        for (let i = 0; i < this.dataArray.length; i++) {\r\n            this.barHeight = this.dataArray[i] * 1;      \r\n            ctx.fillStyle = this.getColorString(this.dataArray[i]);\r\n            ctx.fillRect(x, (H - this.barHeight), this.barWidth, this.barHeight);\r\n            x += this.barWidth+1;\r\n        }\r\n    }\r\n\r\n    getColorString(value) {\r\n        let p = value / 255;\r\n        if (p > 0.8) {\r\n            return \"rgb(250, 0, 255)\";\r\n        } else if (p > 0.7) {\r\n            return \"rgb(250, 255, 0)\";\r\n        } else if (p > 0.5) {\r\n            return \"rgb(204, 255, 0)\";\r\n        } else if (p > 0.4) {\r\n            return \"rgb(0, 219, 131)\";\r\n        } else if (p > 0.3) {\r\n            return \"rgb(0, 199, 255)\";\r\n        } else if (p > 0.2) {\r\n            return \"rgb(0, 12, 255)\";\r\n        } else {\r\n            return \"rgb(0, 0, 255)\";\r\n        }\r\n    }\r\n\r\n    setList(playList){\r\n        this.playList = playList;\r\n    }\r\n}\n\n//# sourceURL=webpack:///./Player.js?");

/***/ }),

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Player.js */ \"./Player.js\");\n/* harmony import */ var _Player_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Player_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _PlayList_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PlayList.js */ \"./PlayList.js\");\n/* harmony import */ var _PlayList_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_PlayList_js__WEBPACK_IMPORTED_MODULE_2__);\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nNumber.prototype.timeFormat = function () {\r\n    let h = \"0\" + Math.floor(this / 3600);\r\n    h = h.substring(h.length - 2, h.length);\r\n    let m = \"0\" + Math.floor(this % 3600 / 60);\r\n    m = m.substring(m.length - 2, m.length);\r\n    let s = \"0\" + Math.floor(this % 60);\r\n    s = s.substring(s.length - 2, s.length);\r\n    return `${h} : ${m} : ${s}`;\r\n};\r\n\r\nclass App {\r\n    constructor(playerEl, listEL) {\r\n        this.player = new Player(playerEl, this);\r\n        this.playList = new PlayList(listEL, this);\r\n    }\r\n}\r\n\r\nwindow.addEventListener(\"load\", () => {\r\n    let app = new App(\"#player\", \"#playList\");\r\n});\r\n\r\nwindow.addEventListener(\"keydown\", (e) => {\r\n    if (e.ctrlKey && e.key.toLowerCase() == \"q\") {\r\n        electron__WEBPACK_IMPORTED_MODULE_0__[\"ipcRenderer\"].send(\"openDev\");\r\n    }\r\n});\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"electron\");\n\n//# sourceURL=webpack:///external_%22electron%22?");

/***/ })

/******/ });