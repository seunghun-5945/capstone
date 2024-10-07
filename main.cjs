const { app, BrowserWindow, Menu, globalShortcut, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs'); // fs 모듈 추가

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // preload 경로 확인
      contextIsolation: true, // 보안 강화를 위해 true로 설정
      enableRemoteModule: false,
      nodeIntegration: false // nodeIntegration을 false로 설정
    },
  });

  win.loadURL('http://localhost:5173');

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

  win.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.key === '=') {
      win.webContents.setZoomLevel(win.webContents.getZoomLevel() + 0.5);
      event.preventDefault();
    }
  });
}

// 폴더 선택 및 파일 목록 가져오기
ipcMain.handle('dialog:openDirectory', async () => {
  const result = await dialog.showOpenDialog(win, {
    properties: ['openDirectory']
  });
  if (result.canceled) {
    return []; // 사용자가 선택을 취소한 경우 빈 배열 반환
  }

  const folderPath = result.filePaths[0]; // 선택한 폴더 경로
  const files = fs.readdirSync(folderPath); // 해당 폴더의 파일 목록 가져오기
  console.log(files); // 파일 목록을 콘솔에 출력

  // 모든 파일의 전체 경로 반환
  return files.map(file => path.join(folderPath, file));
});

app.whenReady().then(() => {
  createWindow();

  globalShortcut.register('CommandOrControl+=', () => {
    if (win) {
      const currentZoom = win.webContents.getZoomLevel();
      win.webContents.setZoomLevel(currentZoom + 0.5);
    }
  });
});

app.on('will-quit', () => {
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
