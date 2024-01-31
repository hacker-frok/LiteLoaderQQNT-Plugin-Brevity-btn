const { contextBridge, ipcRenderer } = require('electron')

//on 监听主进程发来的消息
//send 用于向主进程发送消息
//invoke 发起异步调用到主进程，并等待返回结果
contextBridge.exposeInMainWorld('btnBrevity', {

  updateSettings: (callback) => ipcRenderer.on("LiteLoader.btnBrevity.updateSettings", callback),
  getSettings: () => ipcRenderer.invoke("LiteLoader.btnBrevity.getSettings"),
  setSettings: content => ipcRenderer.invoke("LiteLoader.btnBrevity.setSettings", content),
})
