// main.cjs
const { app, BrowserWindow, Menu, globalShortcut } = require('electron');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadURL('http://localhost:5173'); // Vite 개발 서버 로드

  const template = [
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { 
          label: 'Zoom In',
          accelerator: 'CommandOrControl+=',
          click: () => {
            const currentZoom = win.webContents.getZoomLevel();
            win.webContents.setZoomLevel(currentZoom + 0.5);
          }
        },
        { 
          label: 'Zoom Out',
          accelerator: 'CommandOrControl+-',
          click: () => {
            const currentZoom = win.webContents.getZoomLevel();
            win.webContents.setZoomLevel(currentZoom - 0.5);
          }
        },
        { 
          label: 'Reset Zoom',
          accelerator: 'CommandOrControl+0',
          click: () => win.webContents.setZoomLevel(0)
        },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // 단축키 이벤트 등록
  win.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.key === '=') {
      win.webContents.setZoomLevel(win.webContents.getZoomLevel() + 0.5);
      event.preventDefault();
    }
  });
}

app.whenReady().then(() => {
  createWindow();

  // 글로벌 단축키 등록
  globalShortcut.register('CommandOrControl+=', () => {
    if (win) {
      const currentZoom = win.webContents.getZoomLevel();
      win.webContents.setZoomLevel(currentZoom + 0.5);
    }
  });
});

app.on('will-quit', () => {
  // 애플리케이션 종료 시 글로벌 단축키 해제
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});