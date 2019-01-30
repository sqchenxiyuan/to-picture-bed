import { UPDATE_CONFIG } from "../actions/types"
import IS_SERVER from "../utils/is-server"

const STORAGE_KEY = "TO-PICTURE-BED"

function initConfig(){
    return {
        AK: "",
        SK: "",
        scope: "",
        domain: ""
    }
}

function loadFromLocalStorage(){
    let init = initConfig()
    
    if (IS_SERVER) return init

    let data = localStorage.getItem(STORAGE_KEY)
    try {
        data = JSON.parse(data)
        init.AK = data.AK || ""
        init.SK = data.SK || ""
        init.scope = data.scope || ""
        init.domain = data.domain || ""
    } catch (e){}

    return init
}

function saveToLocalStorage(config){
    if (IS_SERVER) return

    let data = {
        AK: config.AK,
        SK: config.SK,
        scope: config.scope,
        domain: config.domain
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}


const globalConfig = (state = loadFromLocalStorage(), action) => {
    console.log(state)
    switch (action.type){
        case UPDATE_CONFIG:
            let data = Object.assign({}, state, action.newConfig)
            saveToLocalStorage(data)
            return data
    }
    return state
}

export { globalConfig, initConfig, loadFromLocalStorage}