// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import {Contract, CrawlResult} from "./model/contract";

import {contextBridge, ipcRenderer} from "electron"

contextBridge.exposeInMainWorld('electronAPI', {
    createContract: (contract: Contract) => ipcRenderer.send('createContract', contract),
    onItemsLoaded: (cb: (items: string[]) => void) => ipcRenderer.on('load-items-reply', (event, loadedItems) => {
        cb(loadedItems)
    }),
    onRefreshItems: () => ipcRenderer.on('refresh-items', () => {
        ipcRenderer.send('load-items')
    }),
    loadItems: () => ipcRenderer.send('load-items'),
    onCaptcha: (cb: (captcha: string) => void) => ipcRenderer.on('captcha', (event, captcha) => {
        cb(captcha)
    }),
    submitCaptcha: (captcha: string) => ipcRenderer.send('submit-captcha', captcha),
    onCrawlResult: (cb: (result: CrawlResult) => void) => ipcRenderer.on('crawl-result', (event, result) => {
        cb(result)
    }),
    crawl: (code: string) => ipcRenderer.send('crawl', code)
})