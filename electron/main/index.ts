import { app, BrowserWindow, shell, ipcMain, Menu } from 'electron'
import { release } from 'node:os'
import { join } from 'node:path'

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'


export interface ElectronWindow {
  main: BrowserWindow | null
  hiddenGame?: null
  errorWindow?: null
  quickViewWindow?: null
}

// 保持全局引用以防止垃圾收集
const windows: ElectronWindow = {
  main: null
}

let win: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    icon: join(process.env.PUBLIC, 'favicon.ico'),
    useContentSize: true,
    width: 750,
    // minWidth: 1366,
    minWidth: 550,
    height: 500,
    minHeight: 450,
    frame: false,
    // show: false,
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  // 别名引用
  windows.main = win;

  // 主线程通信
  initWindowListeners()

  if (process.env.VITE_DEV_SERVER_URL) { // electron-vite-vue#298
    win.loadURL(url)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
  // win.webContents.on('will-navigate', (event, url) => { }) #344
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})

/** 渲染进程=>主进程通信，初始化
 * 
 */
function initIPCListeners() {

  /** 关闭窗口
   * 
   */
  ipcMain.on('closeApp', (event, action) => {
    console.log('closeApp');
    if (!windows.main) return;
    windows.main.close()
    // if (action === 'minimizeAppToTray') {
    //   windows.main.setSkipTaskbar(true)
    //   // Note: blur the window before hiding it
    //   // so it can be toggled right after being hidden
    //   // (before user focuses another app)
    //   windows.main.blur()
    //   windows.main.hide()
    // }
    // if (action === 'closeMainWindow') {
    //   windows.main.close()
    // }
    // if (action === 'closeApp') {
    //   windows.main.close()
    //   electron.app.quit()
    // }
  })

  /** 最小化
   * 
  */
  ipcMain.on('toMinApp', (event, action) => {
    if (!windows.main) return;
    try {
      // console.log(windows);
      console.log('toMinApp');
    } catch (error) {
      console.log(error);
    }
    windows.main.minimize()
  })

  /** 全屏化
   * 
  */
  ipcMain.on('toMaxApp', (event, action) => {
    console.log('toMaxApp');
    if (!windows.main) return;
    if (windows.main.isMaximized()) {
      windows.main.restore();
    } else {
      windows.main.maximize();
    }
  })

  ipcMain.on('message', (event, message) => {
    console.log(message);
  })
}

/** 主进程=>渲染进程通信，初始化
 * 
 */
function initWindowListeners() {
  if (!windows.main) return;
  // console.log(windows.main);
  console.log(1);
  // windows.main.webContents.send('test:demo', { test: 1, test2: 2 });
  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          click: () => windows.main?.webContents.send('test:demo', 1),
          label: 'Test',
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu)
}

initIPCListeners()