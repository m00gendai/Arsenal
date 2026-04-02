export function getShortCaliberNameFromArray(calibers:string[], displayNames:{name:string, displayName?:string}[], shortCaliber: boolean){
    if(!shortCaliber){
        return calibers
    }
    if(!Array.isArray(calibers)){
        return []
    }
    
    const outputArray = calibers.map(item => {
        // Find an object where displayName matches the item
        const match = displayNames.find(obj => obj.name === item)
        // If a match is found, return the displayName, else return the original item
        return match ? match.displayName : item;
    })
    return outputArray
}  

export function getShortCaliberName(calibers:string[], caliberDisplayNameList:{name: string; displayName?: string;}[]){
    const outputArray = calibers.map(item => {
        // Find an object where displayName matches the item
        const match = caliberDisplayNameList.find(obj => obj.name === item)
        // If a match is found, return the displayName, else return the original item
        return match ? match.displayName : item;
    });
    return outputArray
}