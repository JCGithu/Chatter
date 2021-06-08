const { BrowserWindow, app } = require('electron');
const path = require('path');

const serverSetUp = require('./server/serverSetUp');

function createWindow() {
  serverSetUp();
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: true,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
    },
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
