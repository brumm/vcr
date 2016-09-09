import { app, BrowserWindow, Menu, screen } from 'electron'
import template from './menu-template'
import windowStateKeeper from 'electron-window-state'

import irpc from 'electron-irpc'

import decrypt from './decrypt'
import redirector from './redirector'

const { DEV, PORT = '8080' } = process.env
const windowUrl = DEV
  ? `http://0.0.0.0:${PORT}/`
  : 'file://' + __dirname + '/index.html'
const irpcMain = irpc.main()

let mainWindow

irpcMain.addFunction('decrypt-blob', (blob, callback) => (
  callback(null, decrypt(blob))
))

irpcMain.addFunction('redirector', (url, callback) => {
  redirector(url).then(result => callback(null, result))
})

function createWindow () {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate(template)
  )

  let { width, height } = screen.getPrimaryDisplay().workAreaSize
  let mainWindowState = windowStateKeeper({
    defaultWidth: width * 0.9,
    defaultHeight: height * 0.9
  });

  mainWindow = new BrowserWindow({
    width: mainWindowState.width,
    height: mainWindowState.height,
    x: mainWindowState.x,
    y: mainWindowState.y,
    backgroundColor: '#161616',
    minWidth: 1000,
    minHeight: 700,
    acceptFirstMouse: true,
    frame: false,
    webPreferences: {
      webSecurity: false
    },
    show: false
  })

  mainWindowState.manage(mainWindow)
  mainWindow.loadURL(windowUrl)

  if (DEV) { mainWindow.webContents.openDevTools() }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.once('ready-to-show', () => mainWindow.show())
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

process.on('uncaughtException', ::console.log)
