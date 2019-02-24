import axios from "axios"

import {
    getUploadToken
} from "../utils/getToken"

export function getBucketInfo(ak, bucket){
    return fetch(`https://uc.qbox.me/v2/query?ak=${ak}&bucket=${bucket}`)
}

const UPLOADHOST_LOCAL_STORAGE_KEY = "bucket-upload-host-cache"
export function getBucketUploadHost(ak, bucket){
    let cachedata = localStorage.getItem(UPLOADHOST_LOCAL_STORAGE_KEY)
    try {
        cachedata = JSON.parse(cachedata) || {}
    } catch (e){
        cachedata = {}
    }

    if (cachedata[`${ak}_${bucket}`]){
        return cachedata[`${ak}_${bucket}`]
    }

    return getBucketInfo(ak, bucket).then(res => {
        return res.json().then(data => {
            let host = data.up.src.main[0]
            cachedata[`${ak}_${bucket}`] = host
            localStorage.setItem(UPLOADHOST_LOCAL_STORAGE_KEY, JSON.stringify(cachedata))
            return host
        })
    })
}

export async function uploadFile(uploadPolicy, file, config){
    let {
        ak,
        sk,
        key,
        host,
        onUploadProgress = () => {}
    } = config

    let uploadToken = getUploadToken(uploadPolicy, ak, sk)

    let formData = new FormData()
    if (key) formData.append("key", key) //文件名
    formData.append("token", uploadToken)
    formData.append("file", file) //文件
    
    return axios.post(`https://${host}`, formData, {
        onUploadProgress
    })
}