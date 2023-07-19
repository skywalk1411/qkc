const { app, BrowserWindow, globalShortcut, screen, Menu, ipcMain, webContents } = require('electron');
const path = require('path');
const fs = require('fs');
const settings = {
    css: 0,
    noLoadingScreen: 1,
    gpublacklist: 1,
    gpuvsync: 1,
    gpuframeratelimit: 1,
    gpurasterization: 1,
    zerocopy: 1,
    softrasterizer: 1,
    gpudriverworkaround: 1,
    gpuprocessscrashlimit: 1,
    gpusandbox: 1,
    gpuwatchdog: 1,
    ooprasterization: 1,
    highdpi: 1,
    enablequic: 1,
    fileaccess: 1,
    breakpad: 1,
    printpreview: 1,
    metrics: 1,
    metricsrepo: 1,
    javaharmony: 1,
    noreferres: 1,
    twodcanvas: 1,
    bundledppapi: 1,
    logging: 1,
    websecurity: 1,
};/*
const switchSettings = [
    { key: 'gpublacklist', switch: 'ignore-gpu-blacklist' },
    { key: 'gpuvsync', switch: 'disable-gpu-vsync' },
    { key: 'gpuframeratelimit', switch: 'disable-frame-rate-limit' },
    { key: 'gpurasterization', switch: 'enable-gpu-rasterization' },
    { key: 'zerocopy', switch: 'enable-zero-copy' },
    { key: 'softrasterizer', switch: 'disable-software-rasterizer' },
    { key: 'gpudriverworkaround', switch: 'disable-gpu-driver-workarounds' },
    { key: 'gpuprocessscrashlimit', switch: 'disable-gpu-process-crash-limit' },
    { key: 'gpusandbox', switch: 'disable-gpu-sandbox' },
    { key: 'gpuwatchdog', switch: 'disable-gpu-watchdog' },
    { key: 'ooprasterization', switch: 'enable-oop-rasterization' },
    { key: 'highdpi', switch: 'high-dpi-support', value: 1 },
    { key: 'enablequic', switch: 'enable-quic' },
    { key: 'fileaccess', switch: 'allow-file-access-from-files' },
    { key: 'breakpad', switch: 'disable-breakpad' },
    { key: 'printpreview', switch: 'disable-print-preview' },
    { key: 'metrics', switch: 'disable-metrics' },
    { key: 'metricsrepo', switch: 'disable-metrics-repo' },
    { key: 'javaharmony', switch: 'enable-javascript-harmony' },
    { key: 'noreferres', switch: 'no-referrers' },
    { key: 'twodcanvas', switch: 'disable-2d-canvas-clip-aa' },
    { key: 'bundledppapi', switch: 'disable-bundled-ppapi-flash' },
    { key: 'logging', switch: 'disable-logging' },
    { key: 'websecurity', switch: 'disable-web-security' }
];*/
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
    if (settings.gpublacklist === 1) {
        app.commandLine.appendSwitch('ignore-gpu-blacklist');
    }
    if (settings.gpuvsync === 1) {
        app.commandLine.appendSwitch('disable-gpu-vsync');
    }
    if (settings.gpuframeratelimit === 1) {
        app.commandLine.appendSwitch('disable-frame-rate-limit');
    }
    if (settings.gpurasterization === 1) {
        app.commandLine.appendSwitch('enable-gpu-rasterization');
    }
    if (settings.zerocopy === 1) {
        app.commandLine.appendSwitch('enable-zero-copy');
    }
    if (settings.softrasterizer === 1) {
        app.commandLine.appendSwitch('disable-software-rasterizer');
    }
    if (settings.gpudriverworkaround === 1) {
        app.commandLine.appendSwitch('disable-gpu-driver-workarounds');
    }
    if (settings.gpuprocessscrashlimit === 1) {
        app.commandLine.appendSwitch('disable-gpu-process-crash-limit');
    }
    if (settings.gpusandbox === 1) {
        app.commandLine.appendSwitch('disable-gpu-sandbox');
    }
    if (settings.gpuwatchdog === 1) {
        app.commandLine.appendSwitch('disable-gpu-watchdog');
    }
    if (settings.ooprasterization === 1) {
        app.commandLine.appendSwitch('enable-oop-rasterization');
    }
    if (settings.highdpi === 1) {
        app.commandLine.appendSwitch('high-dpi-support', 1);
    }
    if (settings.enablequic === 1) {
        app.commandLine.appendSwitch('enable-quic');
    }
    if (settings.fileaccess === 1) {
        app.commandLine.appendSwitch('allow-file-access-from-files');
    }
    if (settings.breakpad === 1) {
        app.commandLine.appendSwitch('disable-breakpad');
    }
    if (settings.printpreview === 1) {
        app.commandLine.appendSwitch('disable-print-preview');
    }
    if (settings.metrics === 1) {
        app.commandLine.appendSwitch('disable-metrics');
    }
    if (settings.metricsrepo === 1) {
        app.commandLine.appendSwitch('disable-metrics-repo');
    }
    if (settings.javaharmony === 1) {
        app.commandLine.appendSwitch('enable-javascript-harmony');
    }
    if (settings.noreferres === 1) {
        app.commandLine.appendSwitch('no-referrers');
    }
    if (settings.twodcanvas === 1) {
        app.commandLine.appendSwitch('disable-2d-canvas-clip-aa');
    }
    if (settings.bundledppapi === 1) {
        app.commandLine.appendSwitch('disable-bundled-ppapi-flash');
    }
    if (settings.logging === 1) {
        app.commandLine.appendSwitch('disable-logging');
    }
    if (settings.websecurity === 1) {
        app.commandLine.appendSwitch('disable-web-security');
    }
    /*for (const setting of switchSettings) {
        if (settings[setting.key] === 1) {
            if (setting.hasOwnProperty('value')) {
                app.commandLine.appendSwitch(setting.switch, setting.value);
            } else {
                app.commandLine.appendSwitch(setting.switch);
            }
        }
    }*/
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
