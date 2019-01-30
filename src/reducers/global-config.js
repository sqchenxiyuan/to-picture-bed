import { UPDATE_CONFIG } from "../actions/types"

const STORAGE_KEY = "TO-PICTURE-BED"

function initConfig(){
    return {
        AK: "",
        SK: "",
        scope: ""
    }
}

function loadFromLocalStorage(){
    let init = initConfig()
    let data = localStorage.getItem(STORAGE_KEY)
    try {
        data = JSON.parse(data)
        init.AK = data.AK || ""
        init.SK = data.SK || ""
        init.scope = data.scope || ""
    } catch (e){}
    return data
}

function saveToLocalStorage(config){
    let data = {
        AK: config.AK,
        SK: config.SK,
        scope: config.scope
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}


const globalConfig = (state = loadFromLocalStorage(), action) => {
    switch (action.type){
        case UPDATE_CONFIG:
            let data = Object.assign({}, state, action.newConfig)
            saveToLocalStorage(data)
            return data
    }
    return state
}

export { globalConfig, initConfig }