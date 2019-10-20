const { app, BrowserWindow, ipcMain} = require('electron');

const defaultProps = {
    width:1280,
    height:600,
    resizeable:true,
    webPreferences:{
        nodeIntegration:true,
        nativeWindowOpen: true,
        nodeIntegrationInWorker: true
    }
};

let win = null;
function createWindow(){
    win = new BrowserWindow(defaultProps);
    win.setMenu(null);
    win.loadFile("index.html");

    win.on("closed", ()=>{
        win = null;
    });

    win.webContents.openDevTools();
};

app.on("ready", ()=>{
    createWindow();
});