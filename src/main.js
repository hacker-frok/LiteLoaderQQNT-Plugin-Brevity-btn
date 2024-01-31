
const { BrowserWindow, ipcMain, webContents } = require('electron')
const fs = require('fs')
const path = require('path')

let mainWindow
const pluginDataPath = LiteLoader.plugins["brevity-btn"].path.data;
const settingsPath = path.join(pluginDataPath, "settings.json");
function log(...args) {
    console.log(`\x1b[31m[QQ纯享模式]\x1b[0m`, ...args);
}
// fs判断插件路径是否存在，如果不存在则创建（同时创建父目录（如果不存在的话））
if (!fs.existsSync(pluginDataPath)) {
    fs.mkdirSync(pluginDataPath, { recursive: true });
}
// 判断settings.json是否存在，如果不存在则创建
const defaultIcon = '<svg t="1706663495850" class="icon" viewBox="0 0 1024 1024" version="1.1" name="btnBrevity-icon1"   xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16">    <path    d="M401.493333 511.914667l196.266667-198.229334-30.293333-30.037333L341.333333 512.085333l228.352 228.309334 30.165334-30.165334-198.314667-198.314666z"> </path> </svg>'
if (!fs.existsSync(settingsPath)) {
    fs.writeFileSync(settingsPath, JSON.stringify({
        "mini": false,
        "icon": defaultIcon,
    }));
} else {
    const data = fs.readFileSync(settingsPath, "utf-8");
    const config = JSON.parse(data);
    if (config.mini == undefined || config.mini == null) {
        config.mini = false;
    }
    if (config.icon) {
        config.icon = defaultIcon
    }

}
ipcMain.handle(
    "LiteLoader.btnBrevity.getSettings",
    (event, message) => {
        try {
            const data = fs.readFileSync(settingsPath, "utf-8");
            const config = JSON.parse(data);
            return config;
        } catch (error) {
            log(error);
            return {};
        }
    }
);

ipcMain.handle(
    "LiteLoader.btnBrevity.setSettings",
    (event, content) => {
        try {
            const new_config = JSON.stringify(content);
            fs.writeFileSync(settingsPath, new_config, "utf-8");

            if (mainWindow) {
                mainWindow.webContents.send(
                    "LiteLoader.btnBrevity.updateSettings",
                    content
                );
            } else {
                webContents.getAllWebContents().forEach((webContent) => {
                    webContent.send(
                        "LiteLoader.btnBrevity.updateSettings",
                        content
                    );
                });
            }


        } catch (error) {
            log(error);
        }
    }
);

// 防抖函数
function debounce(fn, time) {
    let timer = null;
    return function (...args) {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, time);
    }
}


// 创建窗口时触发
exports.onBrowserWindowCreated = (window) => {
    window.webContents.on("did-stop-loading", () => {
        if (window.webContents.getURL().indexOf("#/main/message") !== -1) {
            mainWindow = window;
        }
    });

}
