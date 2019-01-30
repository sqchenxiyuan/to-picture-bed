import { combineReducers, createStore } from "redux"
import { globalConfig, initConfig as initGlobalConfig, loadFromLocalStorage } from "./global-config"
import { uploadFilesData, initData as initUploadFilesData } from "./uploaded-files"

const rootReducer = combineReducers({
    globalConfig,
    uploadFilesData
})

export function createNewStore(){
    return createStore(rootReducer, {
        globalConfig: loadFromLocalStorage(),
        uploadFilesData: initUploadFilesData()
    })
}