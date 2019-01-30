import axios from "axios"

import {
    getAccessToken,
    getUploadToken
} from "../utils/getToken"

export function getBucketInfo(ak, bucket){
    return fetch(`https://uc.qbox.me/v2/query?ak=${ak}&bucket=${bucket}`)
}

export function getBucketUploadHost(ak, bucket){
    return getBucketInfo(ak, bucket).then(res => {
        return res.json().then(data => {
            return data.up.src.main[0]
        })
    })
}

export async function uploadFile(uploadPolicy, file, config){
    let {
        ak,
        sk,
        key,
        onUploadProgress = e => { console.log(e) }
    } = config

    let uploadToken = getUploadToken(uploadPolicy, ak, sk)

    let formData = new FormData()
    if (key) formData.append("key", key) //文件名
    formData.append("token", uploadToken)
    formData.append("file", file) //文件
    
    let bucket = uploadPolicy.scope
    let host = await getBucketUploadHost(ak, bucket)

    return axios.post(`http://${host}`, formData, {
        onUploadProgress
    })
}