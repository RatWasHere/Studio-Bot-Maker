const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 790,
    minWidth: 1170,
    icon: 'icon.png',
    center: true,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
  })
  win.setMenuBarVisibility(false)
  win.loadFile('./index.html')
}

app.whenReady().then(createWindow)

const { autoUpdater } = require('electron');
autoUpdater.setFeedURL({
    provider: "github",
    owner: "RatWasHere",
    repo: "studiobotmaker",
    token: "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",
    private: true
  });
autoUpdater.on('update-available', (info) => {
    autoUpdater.on('update-available', (info) => {
        console.log('Update available:', info.version);
      });  });
