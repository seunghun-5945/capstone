// electron/main.js
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs').promises;
const fsSync = require('fs'); // 동기 버전의 fs 추가

const isDev = !app.isPackaged;

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
    });

    mainWindow.loadURL(
        isDev
            ? 'http://localhost:5173'
            : `file://${path.join(__dirname, '../dist/index.html')}`
    );

    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
}

app.whenReady().then(createWindow);

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

// IPC 핸들러
ipcMain.handle('dialog:openDirectory', async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openDirectory']
    });
    return result.canceled ? null : result.filePaths[0];
});

ipcMain.handle('fs:readDirectory', async (_, directoryPath) => {
    try {
        const files = await fs.readdir(directoryPath, { withFileTypes: true });
        const filesData = await Promise.all(
            files.map(async (file) => {
                const filePath = path.join(directoryPath, file.name);
                let stats;
                try {
                    stats = await fs.stat(filePath);
                    return {
                        name: file.name,
                        path: filePath,
                        isDirectory: file.isDirectory(),
                        size: stats.size
                    };
                } catch (error) {
                    console.error(`Error reading stats for ${filePath}:`, error);
                    return {
                        name: file.name,
                        path: filePath,
                        isDirectory: file.isDirectory(),
                        size: 0
                    };
                }
            })
        );
        return filesData;
    } catch (error) {
        console.error('Error reading directory:', error);
        throw error;
    }
});

ipcMain.handle('fs:readFile', async (_, filePath) => {
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        return content;
    } catch (error) {
        console.error('Error reading file:', error);
        throw error;
    }
});