const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('backendManager', {
    startDev: () => ipcRenderer.send('start-backend-dev'),
    stop: () => ipcRenderer.send('stop-backend'),
});
