import uuidv4 from "uuid/v4"
import mime from "mime"
import { UPLOAD_FILES } from "../actions/types"

function initData(){
    return {
        uploadingFiles: [],
    }
}

const uploadFilesData = function(state = initData(), action){
    switch (action.type){
        case UPLOAD_FILES:
            let date = new Date()
            let files = action.files.map(file => {
                let extension = mime.getExtension(file.type) || file.name.match(/\.[^.]*?$/).toString() || file.name
                return {
                    file: file,
                    key: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}/${uuidv4()}.${extension}`
                }
            })

            let data = Object.assign({}, state, {uploadingFiles: [...files, ...state.uploadingFiles]})
            return data
    }

    return state
}

export {
    uploadFilesData,
    initData
}