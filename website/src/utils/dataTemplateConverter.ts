import type { ItemType } from "../../../lib/interfaces"

export function dataTemplateConverter(item: ItemType){
    let converted = []

    for(const [key, value] of Object.entries(item)){
        converted.push(key)
    }

    return converted
}