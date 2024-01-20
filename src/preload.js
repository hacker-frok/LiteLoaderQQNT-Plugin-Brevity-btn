const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('btnBrevity', {
  getConfig: (dataPath) => ipcRenderer.invoke('btnBrevity.getConfig', dataPath),
  setConfig: (dataPath, config) => ipcRenderer.invoke('btnBrevity.setConfig', dataPath, config),
})
