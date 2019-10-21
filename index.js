const fs = require('fs');
const { app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');


const defaultProps = {
    width:1280,
    height:600,
    resizeable:true,
    webPreferences:{
        nodeIntegration:true,
        nativeWindowOpen: true,
        nodeIntegrationInWorker: true
    },
    icon: path.join(__dirname, 'images/icon.ico')
};

let win = null;

ipcMain.on("openDev", (e, arg)=>{
    win.webContents.openDevTools();
});

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