/* eslint import/no-extraneous-dependencies: ["error", {"optionalDependencies": false}] */
import { app, BrowserWindow } from 'electron';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  /* if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools();
  }*/

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
