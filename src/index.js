const { app, BrowserWindow, globalShortcut, screen, Menu, ipcMain, webContents } = require('electron');
const path = require('path');
const fs = require('fs');
const settings = {
    css: 0
};
const switchSettings = [
    { status: 1, key: 'gpublacklist', switch: 'ignore-gpu-blacklist' },
    { status: 1, key: 'gpuvsync', switch: 'disable-gpu-vsync' },
    { status: 1, key: 'gpuframeratelimit', switch: 'disable-frame-rate-limit' },
    { status: 1, key: 'gpurasterization', switch: 'enable-gpu-rasterization' },
    { status: 1, key: 'zerocopy', switch: 'enable-zero-copy' },
    { status: 1, key: 'softrasterizer', switch: 'disable-software-rasterizer' },
    { status: 1, key: 'gpudriverworkaround', switch: 'disable-gpu-driver-workarounds' },
    { status: 1, key: 'gpuprocessscrashlimit', switch: 'disable-gpu-process-crash-limit' },
    { status: 1, key: 'gpusandbox', switch: 'disable-gpu-sandbox' },
    { status: 1, key: 'gpuwatchdog', switch: 'disable-gpu-watchdog' },
    { status: 1, key: 'ooprasterization', switch: 'enable-oop-rasterization' },
    { status: 1, key: 'highdpi', switch: 'high-dpi-support', value: 1 },
    { status: 1, key: 'enablequic', switch: 'enable-quic' },
    { status: 1, key: 'fileaccess', switch: 'allow-file-access-from-files' },
    { status: 1, key: 'breakpad', switch: 'disable-breakpad' },
    { status: 1, key: 'printpreview', switch: 'disable-print-preview' },
    { status: 1, key: 'metrics', switch: 'disable-metrics' },
    { status: 1, key: 'metricsrepo', switch: 'disable-metrics-repo' },
    { status: 1, key: 'javaharmony', switch: 'enable-javascript-harmony' },
    { status: 1, key: 'noreferres', switch: 'no-referrers' },
    { status: 1, key: 'twodcanvas', switch: 'disable-2d-canvas-clip-aa' },
    { status: 1, key: 'bundledppapi', switch: 'disable-bundled-ppapi-flash' },
    { status: 1, key: 'logging', switch: 'disable-logging' },
    { status: 1, key: 'websecurity', switch: 'disable-web-security' }
];
let mainWindow;
let settingsWindow;
let isAppWindowActive = false;
function createMainWindow() {
    const displays = screen.getAllDisplays();
    const primaryDisplay = screen.getPrimaryDisplay();
    const primaryScreen = displays.find(display => display.id === primaryDisplay.id);
    mainWindow = new BrowserWindow({
        x: primaryScreen.bounds.x,
        y: primaryScreen.bounds.y,
        width: primaryScreen.bounds.width,
        height: primaryScreen.bounds.height,
        webPreferences: {
            nodeIntegration: true,
            webgl: true,
            experimentalFeatures: true,
            enableRemoteModule: false,
            hardwareAcceleration: true
        },
        title: 'qkc',
        show: false,
    });
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
    mainWindow.webContents.on('page-title-updated', (event) => {
        event.preventDefault();
    });
    mainWindow.on('blur', () => {
        isAppWindowActive = false;
    });
    mainWindow.on('focus', () => {
        isAppWindowActive = true;
    });
    for (const setting of switchSettings) {
        if (setting.status === 1) {
            if (setting.hasOwnProperty('value')) {
                app.commandLine.appendSwitch(setting.switch, setting.value);
                console.log('has value')
            } else {
                app.commandLine.appendSwitch(setting.switch);
                console.log('has no value')
            }
        }
    }
    mainWindow.loadURL('https://kirka.io');
    mainWindow.maximize();
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.setTitle('qkc');
        if (settings.css === 1) {
            const cssPath = path.join(__dirname, 'test.css');
            fs.readFile(cssPath, 'utf-8', (err, data) => {
                if (err) {
                    console.error('Error reading CSS file:', err);
                    return;
                }
                const css = data.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                mainWindow.webContents.executeJavaScript(`
                    (function() {
                        var style = document.createElement('style');
                        style.innerHTML = \`${css}\`;
                        document.head.appendChild(style);
                    })();
                    `);
            });
        }
    });
    Menu.setApplicationMenu(null);
}
function createSettingsWindow(settings) {
    settingsWindow = new BrowserWindow({
        width: 400,
        height: 300,
        parent: mainWindow,
        modal: true,
        webPreferences: {
            nodeIntegration: true
        }
    });
    settingsWindow.loadFile('settings.html');
    settingsWindow.webContents.on('did-finish-load', () => {
        settingsWindow.webContents.send('settings-data', settings);
    });
}
app.whenReady().then(() => {
    createMainWindow();
    globalShortcut.register('F5', () => {
        if (isAppWindowActive) {
            mainWindow.webContents.reloadIgnoringCache();
        }
    });
    globalShortcut.register('F8', () => {
        if (isAppWindowActive) {
            app.commandLine.appendSwitch('enable-frame-rate-limit');
            createSettingsWindow(settings);
        }
    });
    globalShortcut.register('F11', () => {
        if (isAppWindowActive) {
            mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
    });
    globalShortcut.register('F12', () => {
        if (isAppWindowActive) {
            mainWindow.webContents.openDevTools();
        }
    });
    ipcMain.on('get-settings', (event) => {
        event.sender.send('settings-data', settings);
    });
    ipcMain.on('request-settings', (event) => {
        event.reply('settings-data', settings);
    });
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
