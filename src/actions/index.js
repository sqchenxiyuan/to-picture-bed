import { UPDATE_CONFIG, UPLOAD_FILES } from "./types"

//更新配置
export function updateConfig(newConfig){
    return {
        type: UPDATE_CONFIG,
        newConfig
    }
}

//上传文件
export function uploadFiles(files){
    return {
        type: UPLOAD_FILES,
        files
    }
}