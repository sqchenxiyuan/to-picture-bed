import jsSHA from "jssha"

function HMACbySha1(text, key){
    let c = new jsSHA("SHA-1", "TEXT")
    c.setHMACKey(key, "TEXT")
    c.update(text)
    return c.getHMAC("B64")
}

function urlsafeBase64Encode(base64){
    return base64.replace(/\+/g, "-").replace(/\//g, "_")
}

function getAccessToken(data, accessKey, secreyKey){
    let sign = HMACbySha1(data, secreyKey)
    let sign_safe = urlsafeBase64Encode(sign)
    return `${accessKey}:${sign_safe}`
}

function getUploadToken(uploadData, accessKey, secreyKey){
    let uploadAccess = JSON.stringify(uploadData)
    uploadAccess = Buffer.from(uploadAccess).toString("base64")
    uploadAccess = urlsafeBase64Encode(uploadAccess)

    let sign = HMACbySha1(uploadAccess, secreyKey)
    let sign_safe = urlsafeBase64Encode(sign)
    return `${accessKey}:${sign_safe}:${uploadAccess}`
}

export {
    getAccessToken,
    getUploadToken
}