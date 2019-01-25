import { getBucketUploadHost, uploadFile } from "./interfaces/bukect"

import axios from "axios"

let AK = localStorage.getItem("QINIU_AK")
let SK = localStorage.getItem("QINIU_SK")

function biu(e){
    // console.log(e.target.files)
    let file = e.target.files[0]
    let date = new Date()
    uploadFile({
        scope: "test",
        deadline: parseInt(Date.now() / 1000) + 3600
    }, file, {
        ak: AK,
        sk: SK,
        key: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}/${file.name}`
    }).then(res => {
        console.log(res)
    }).catch(err => {
        console.error(err)
    })
}

document.getElementById("biu").addEventListener("change", biu)