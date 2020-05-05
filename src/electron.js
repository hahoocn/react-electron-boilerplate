import { app, BrowserWindow, globalShortcut, Menu } from 'electron';
// import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';


let mainWindow;

Menu.setApplicationMenu(null);

function createWindow() {
  // installExtension(REDUX_DEVTOOLS)
  //   .then(name => console.log(`Added Extension:  ${name}`))
  //   .catch(err => console.log('An error occurred: ', err));

  if (process.env.NODE_ENV !== 'development') {
    globalShortcut.register('CmdOrCtrl+R', () => {});
  }

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
