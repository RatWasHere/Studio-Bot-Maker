const { app, BrowserWindow, contextBridge, ipcMain, dialog } = require('electron');
let win;
const fs = require('fs');
function createWindow() {
  /*
  let tempWindow = new BrowserWindow({
    width: 800,
    height: 500,
    resizable: false,
    maxHeight: 500,
    maxWidth: 800,
    icon: 'icon.png',
    title: 'Studio Bot Maker',
    center: true,
    transparent: true,
    titleBarStyle: 'hidden',
    minHeight: 500,
    minWidth: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  })
  tempWindow.loadFile('./Loader.html')
  */
  win = new BrowserWindow({
    width: 1170,
    height: 750,
    minHeight: 800,
    minWidth: 1170,
    icon: 'icon.png',
    title: 'Studio Bot Maker',
    center: true,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  });
  win.loadFile('./index.html');
  win.setMenuBarVisibility(false);
  win.show()
  /*
  ipcMain.on('selectedProject', (event, projectData) => {
    if (projectData != undefined) {
      fs.writeFileSync('./AppData/data.json', projectData)
    }
    ipcMain.on('finishLoad', () => {
      tempWindow.close()
    })
})
    */

}

app.whenReady().then(createWindow);

ipcMain.on('selectDirectory', async function (event) {
  const dialog = require('electron').dialog
  const result = await dialog.showOpenDialog(win, {
    properties: ['openDirectory']
  });

  event.sender.send('selectedDirectory', result.filePaths);
});

  const { remote } = require('electron') 
  
  
  app.on('ready', () => {

const processPathe = require('process').cwd();
try {
  if (!fs.readFileSync('C:/ProgramData/settings.json')) {
    fs.writeFileSync('C:/ProgramData/settings.json', JSON.stringify({projects: []}))
  }
} catch(err) {
  fs.writeFileSync('C:/ProgramData/settings.json', JSON.stringify({projects: []}))
}

try {
if (fs.readdirSync(processPathe + '\\AppData')) {}
} catch (err) {
  const request = require('request');
  const unzipper = require('unzipper');
  const fse = require('fs-extra');
  const path = require('path')
  
  async function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
      request(url)
        .pipe(fs.createWriteStream(dest))
        .on('close', resolve)
        .on('error', reject);
    });
  }

  
  async function main() {
    try {
      await downloadFile("https://cdn.glitch.global/a683cb76-598f-4483-808e-6a7d6eee6c26/AppData.zip?v=1688498466037", "AppData.zip");
      if (!fs.existsSync("AppData")) {
        fs.mkdirSync("AppData");
      }
      const tempDir = fs.mkdtempSync("temp");
      fs.createReadStream("AppData.zip")
        .pipe(unzipper.Extract({ path: tempDir }))
        .on('close', () => {
          const appdDir = fs.readdirSync(tempDir).find((dir) => dir.toLowerCase() === "appdata");
          const appdPath = fs.realpathSync(path.join(tempDir, appdDir));
          fse.copySync(appdPath, "AppData");
          fse.removeSync(appdPath);
          fs.rmdirSync(tempDir, { recursive: true });
          try {
            fs.rmdirSync("AppData.zip", { recursive: true, force: true });
          } catch(err) {
            null
          }
        });
    } catch (err) {
      console.error(err);
    }

  }
  setTimeout(() => {
    try {
      main();

    } catch (err) {

    }

  }, 6000)
  
  
}

/* UPDATES */




  });

  

  const { autoUpdater } = require("electron-updater")

  autoUpdater.setFeedURL({
    url: 'https://github.com/RatWasHere/Studio-Bot-Maker',
    provider: 'github',
    repo: 'Studio-Bot-Maker',
    owner: 'RatWasHere'
  })

  autoUpdater.checkForUpdates()
  
  autoUpdater.on('update-available', (_event, releaseName, releaseNotes) => {
    autoUpdater.downloadUpdate()
    fs.writeFileSync('./updateavailable.txt', 'available')
    updatePending = true;
    const dialogOpts = {
      type: 'info',
      buttons: ['Alright!'],
      title: 'Studio Bot Maker Is Downloading An Update',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: '✌️ Let\'s Go!'
   };
   dialog.showMessageBox(dialogOpts);
   })
  autoUpdater.on('update-not-available', () => {
    fs.writeFileSync('./updatenotavailable.txt', 'notavailable')
  })
  autoUpdater.on('login', () => {
    fs.writeFileSync('./login.txt', 'success')
  })
  let lastKnownUpdateProgress = 0;

  autoUpdater.on('update-downloaded', (_event, releaseNotes, releaseName) => {
    fs.writeFileSync('./downloadedupdate', 'downlod')

    const dialogOpts = {
       type: 'info',
       buttons: ['Update Now!', 'Nope'],
       title: 'Studio Bot Maker',
       message: process.platform === 'win32' ? releaseNotes : releaseName,
       detail: 'Studio Bot Maker has a few new features to come! Do you wish to update now?'
    };
    dialog.showMessageBox(dialogOpts).then((returnValue) => {
       if (returnValue.response == 0) {
        autoUpdater.quitAndInstall({isSilent: false, isForceRunAfter: true})
      } 
    });
 });
 autoUpdater.autoInstallOnAppQuit = true;
  autoUpdater.on('download-progress', async (download) => {
    fs.writeFileSync('./updatedata', download.percent)

    lastKnownUpdateProgress = download.percent;
    if (download.percent == 100) {
        autoUpdater.quitAndInstall()
    }
  })
  ipcMain.on('getUpdateProcentage', async (event) => {
      event.sender.send(lastKnownUpdateProgress)
  })
  ipcMain.on('whatIsDoing', () => {
    let activityData = JSON.parse(fs.readFileSync('./AppData/presence.json'))
      rpc.setActivity({
        details: activityData.firstHeader,
        state: activityData.secondHeader,
        instance: false,
        largeImageKey: 'icon',
        largeImageText: 'Working on ' + activityData.botName
      })
  })

  const DiscordRPC = require('discord-rpc');
  const clientId = '1106673404976824370';
  DiscordRPC.register(clientId);
  
  const rpc = new DiscordRPC.Client({ transport: 'ipc' });

    autoUpdater.on('before-quit-for-update', () => {

  })
  rpc.on('ready', () => {
    console.log('Discord Rich Presence is ready!');
    rpc.setActivity({
      details: 'Loading...',
      state: 'Starting up!',
      startTimestamp: Date.now(),
      instance: false,
      largeImageKey: 'icon',
      largeImageText: 'Hold on'
    });
  });
  /*
        largeImageKey: '',
      largeImageText: 'Large Image Text',
      smallImageKey: 'small_image_key',
      smallImageText: 'Small Image Text', */
  
  
  app.on('ready', () => {
    rpc.login({ clientId }).catch(console.error);
    autoUpdater.checkForUpdates();

  });
  
  async function waitForEvent(window, eventName, cb) {
    return new Promise((resolve) => {
      window.webContents.once(eventName, (...args) => {
        resolve(args);
        cb();
      });
    });
  }

let windows = {}
var lastWindow; 
function newActionEditorWindow(data) {
  let customId = data.customId || ''
  let windowTime = new Date().getTime()
      const actionEditorWindow = new BrowserWindow({
          width: 800,
          height: 600,
          minHeight: 600,
          minWidth: 800,
          maxHeight: 600,
          maxWidth: 800,
          icon: 'icon.png',
          title: `Studio Bot Maker | #${data.action} - ${data.actions[data.action].name}`,
          center: true,
          resizable: false,
          parent: lastWindow || win,
          transparent: true,
          titleBarStyle: 'hidden',
          modal: true,
          webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
          }
      })
      lastWindow = actionEditorWindow;
      windows[windowTime] = actionEditorWindow
      actionEditorWindow.loadFile('./EditorUI.html')
      actionEditorWindow.setMenuBarVisibility(false);
      actionEditorWindow.on('ready-to-show', () => {
        actionEditorWindow.webContents.send('data', data, windowTime);
      })
      actionEditorWindow.on('close', () => {
          lastWindow = actionEditorWindow.getParentWindow();
      })
      


      ipcMain.on(`${windowTime}`, (event, data) => {
        if (data.event == 'customReceived') {
          actionEditorWindow.getParentWindow().webContents.send('menuData', data.data)
          actionEditorWindow.close()
        }
        if (data.event == 'save') {
          actionEditorWindow.getParentWindow().webContents.send('childSave' + customId, data.action)
        }
        if (data.event == 'close') {
          lastWindow = actionEditorWindow.getParentWindow();
          actionEditorWindow.close();
        }
        if (data.event == 'openCustom') {
          newMenuEditorWindow(data)
        }
      })
    }
    function newMenuEditorWindow(startData) {
      var data = {
        data: startData.data,
        UI: startData.UI,
        name: startData.name,
        variables: startData.variables,
        actionType: startData.actionType
      }
      let windowTime = new Date().getTime()
          const actionEditorWindow = new BrowserWindow({
              width: 800,
              height: 600,
              minHeight: 600,
              minWidth: 800,
              maxHeight: 600,
              maxWidth: 800,
              icon: 'icon.png',
              title: `Studio Bot Maker | Editing Menu`,
              center: true,
              resizable: false,
              parent: lastWindow || win,
              transparent: true,
              titleBarStyle: 'hidden',
              modal: true,
              webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true
              }
          })
          lastWindow = actionEditorWindow;
          windows[windowTime] = actionEditorWindow
          actionEditorWindow.loadFile('./MenuUI.html')
          actionEditorWindow.setMenuBarVisibility(false);
          actionEditorWindow.on('ready-to-show', () => {
            actionEditorWindow.webContents.send('data', data, windowTime);
          })
          actionEditorWindow.on('close', () => {
              lastWindow = actionEditorWindow.getParentWindow();
              actionEditorWindow.getParentWindow().focus()
          })
          
    
    
          ipcMain.on(`${windowTime}`, (event, data) => {
            if (data.event == 'customReceived') {
              actionEditorWindow.getParentWindow().webContents.send('menuData', data.data)
              actionEditorWindow.close()
            }
            if (data.event == 'close') {
              lastWindow = actionEditorWindow.getParentWindow();
              actionEditorWindow.close();
              actionEditorWindow.getParentWindow().webContents.send('childSave', data.data)
            }
            if (data.event == 'openCustom') {
               newMenuEditorWindow(data)
            }
          })
        }
  ipcMain.on('editAction', async (event, data) => {
    newActionEditorWindow(data)
  })
  let isBotRunning = false;
  ipcMain.on('runBot', () => {
    const botWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    });
    botWindow.setMenuBarVisibility(false);
    botWindow.loadFile('./BotWindow.html');

  })