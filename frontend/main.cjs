const { app, BrowserWindow } = require('electron');
const path = require('path');
const backendManager = require('./backendManager.cjs');

function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 800,
        autoHideMenuBar: true,
        title: 'Gerenciador de Tarefas',
        icon: path.join(__dirname, 'public', 'img.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.cjs'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    // ⚠️ Se estiver rodando com Vite (dev)
    win.loadURL('http://localhost:5173');

    // ✅ Ao fechar, para backend
    win.on('closed', () => {
        backendManager.stop();
        win.destroy();
    });
}

app.whenReady().then(() => {
    console.log('🚀 Iniciando aplicação...');

    // 🔥 Start backend primeiro
    backendManager.startDev();

    // 🔥 Depois cria a janela
    setTimeout(() => {
        createWindow();
    }, 3000); // ✅ Dá 3 segundos para garantir que o backend suba antes
});

app.on('window-all-closed', () => {
    backendManager.stop();
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
