import { UPDATE_CONFIG } from "./types"

export function updateConfig(newConfig){
    return {
        type: UPDATE_CONFIG,
        newConfig
    }
}