const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // 디렉토리 선택 다이얼로그 열기
  openDirectory: async () => {
    return await ipcRenderer.invoke('dialog:openDirectory');
  },
  
  // 디렉토리 읽기
  readDirectory: async (directoryPath) => {
    return await ipcRenderer.invoke('fs:readDirectory', directoryPath);
  },
  
  // 파일 읽기
  readFile: async (filePath) => {
    return await ipcRenderer.invoke('fs:readFile', filePath);
  }
});