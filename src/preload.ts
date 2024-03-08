// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import {Contract} from "./model/contract";

import {contextBridge, ipcRenderer} from "electron"

contextBridge.exposeInMainWorld('electronAPI', {
    createContract: (contract: Contract) => ipcRenderer.send('createContract', contract)
})