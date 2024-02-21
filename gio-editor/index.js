const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow () {
    const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js')
    }
    })
    mainWindow.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
