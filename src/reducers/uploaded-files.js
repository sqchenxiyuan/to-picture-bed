import { UPLOAD_FILES } from "../actions/types"

function initData(){
    return {
        uploadedFiles: [],
        uploadingFiles: []
    }
}

const uploadFilesData = function(state = initData(), action){
    switch (action.type){
        case UPLOAD_FILES:
            let data = Object.assign({}, state, {uploadedFiles: [...state.uploadedFiles, ...action.files]})
            return data
    }

    return state
}

export {
    uploadFilesData,
    initData
}