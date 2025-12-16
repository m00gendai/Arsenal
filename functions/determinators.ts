import { AccessoryType_LightLaser, AccessoryType_Magazine, AccessoryType_Misc, AccessoryType_Optic, AccessoryType_Scope, AccessoryType_Silencer, AmmoType, CollectionType, GunType, ItemType, Languages, PartType_Barrel, PartType_ConversionKit } from "interfaces";
import sortGunCollection from "./sortGunCollection";
import { SorterSettings } from "stores/usePreferenceStore";
import sortAmmoCollection from "./sortAmmoCollection";
import * as schema from "db/schema"
import { and, or, like, sql } from 'drizzle-orm';
import { emptyGunObject, gunDataTemplate, gunRemarks } from "lib/DataTemplates/gunDataTemplate";
import { ammoDataTemplate, ammoRemarks, emptyAmmoObject } from "lib/DataTemplates/ammoDataTemplate";
import { cardActionsAccessory_LightLaser, cardActionsAccessory_Magazine, cardActionsAccessory_Misc, cardActionsAccessory_Optic, cardActionsAccessory_Scope, cardActionsAccessory_Silencer, cardActionsAmmo, cardActionsGun, cardActionsPart_Barrel, cardActionsPart_ConversionKit, requiredFieldsAccessory_LightLaser, requiredFieldsAccessory_Magazine, requiredFieldsAccessory_Misc, requiredFieldsAccessory_Optic, requiredFieldsAccessory_Scope, requiredFieldsAccessory_Silencer, requiredFieldsAmmo, requiredFieldsGun, requiredFieldsPart_Barrel, requiredFieldsPart_ConversionKit, sortingOptionsAccessory_LightLaser, sortingOptionsAccessory_Magazine, sortingOptionsAccessory_Misc, sortingOptionsAccessory_Optic, sortingOptionsAccessory_Scope, sortingOptionsAccessory_Silencer, sortingOptionsAmmo, sortingOptionsGun, sortingOptionsPart_Barrel, sortingOptionsPart_ConversionKit } from "configs";
import sortAccessoryCollection_Silencer from "./sortAccessoryCollection_Silencer";
import { accessoryDataTemplate_Silencer, emptySilencerObject, silencerRemarks } from "lib/DataTemplates/accessoryDataTemplate_Silencer";
import sortAccessoryCollection_Optic from "./sortAccessoryCollection_Optic";
import { accessoryDataTemplate_Optic, emptyOpticObject, opticRemarks } from "lib/DataTemplates/accessoryDataTemplate_Optic";
import sortPartCollection_ConversionKit from "./sortPartCollection_ConversionKit";
import { conversionKitRemarks, emptyConversionKitObject, partDataTemplate_ConversionKit } from "lib/DataTemplates/partDataTemplate_ConversionKit";
import sortAccessoryCollection_LightLaser from "./sortAccessoryCollection_LightLaser";
import { accessoryDataTemplate_LightLaser, emptyLightLaserObject, lightLaserRemarks } from "lib/DataTemplates/accessoryDataTemplate_LightLaser";
import sortPartCollection_Barrel from "./sortPartCollection_Barrel";
import { barrelRemarks, emptyBarrelObject, partDataTemplate_Barrel } from "lib/DataTemplates/partDataTemplate_Barrel";
import { editAccessoryTitle, editAmmoTitle, editGunTitle, editPartTitle, newAccessoryTitle, newAmmoTitle, newGunTitle, newPartTitle, shotLabel, tabBarLabels } from "lib/textTemplates";
import sortAccessoryCollection_Scope from "./sortAccessoryCollection_Scope";
import { accessoryDataTemplate_Scope, emptyScopeObject, scopeRemarks } from "lib/DataTemplates/accessoryDataTemplate_Scope";
import sortAccessoryCollection_Magazine from "./sortAccessoryCollection_Magazine";
import { accessoryDataTemplate_Magazine, emptyMagazineObject, magazineRemarks } from "lib/DataTemplates/accessoryDataTemplate_Magazine";
import sortAccessoryCollection_Misc from "./sortAccessoryCollection_Misc";
import { accessoryDataTemplate_Misc, emptyMiscAccessoryObject, miscAccessoryRemarks } from "lib/DataTemplates/accessoryDataTemplate_Misc";

export function determineSchema(collection:CollectionType){
    switch(collection){
        case "gunCollection":
            return schema.gunCollection
        case "ammoCollection":
            return schema.ammoCollection
        case "accessoryCollection_Silencer":
            return schema.accessoryCollection_Silencer
        case "accessoryCollection_Optic":
            return schema.accessoryCollection_Optic
        case "accessoryCollection_Scope":
            return schema.accessoryCollection_Scope
        case "accessoryCollection_LightLaser":
            return schema.accessoryCollection_LightLaser
        case "accessoryCollection_Magazine":
            return schema.accessoryCollection_Magazine
        case "accessoryCollection_Misc":
            return schema.accessoryCollection_Misc
        case "partCollection_ConversionKit":
            return schema.partCollection_ConversionKit
        case "partCollection_Barrel":
            return schema.partCollection_Barrel
    }
}

export function determineTagSchema(collection:CollectionType){
    switch(collection){
        case "gunCollection":
            return schema.gunTags
        case "ammoCollection":
            return schema.ammoTags
        case "accessoryCollection_Silencer":
            return schema.accessory_SilencerTags
        case "accessoryCollection_Optic":
            return schema.accessory_OpticTags
        case "accessoryCollection_Scope":
            return schema.accessory_ScopeTags
        case "accessoryCollection_LightLaser":
            return schema.accessory_LightLaserTags
        case "accessoryCollection_Magazine":
            return schema.accessory_MagazineTags
        case "accessoryCollection_Misc":
            return schema.accessory_MiscTags
        case "partCollection_ConversionKit":
            return schema.part_ConversionKitTags
        case "partCollection_Barrel":
            return schema.part_BarrelTags
    }
}

export function determineSortingFunction(collection:CollectionType, sortBy: SorterSettings){

    switch(collection){
        case "gunCollection":{
            return sortGunCollection(sortBy[collection].direction, sortBy[collection].type)
        };
        case "ammoCollection":{
            return sortAmmoCollection(sortBy[collection].direction, sortBy[collection].type)
        }
        case "accessoryCollection_Silencer":{
            return sortAccessoryCollection_Silencer(sortBy[collection].direction, sortBy[collection].type)
        };
        case "accessoryCollection_Optic":{
            return sortAccessoryCollection_Optic(sortBy[collection].direction, sortBy[collection].type)
        };
        case "accessoryCollection_Scope":{
            return sortAccessoryCollection_Scope(sortBy[collection].direction, sortBy[collection].type)
        };
        case "accessoryCollection_LightLaser":{
            return sortAccessoryCollection_LightLaser(sortBy[collection].direction, sortBy[collection].type)
        };
        case "accessoryCollection_Magazine":{
            return sortAccessoryCollection_Magazine(sortBy[collection].direction, sortBy[collection].type)
        };
        case "accessoryCollection_Misc":{
            return sortAccessoryCollection_Misc(sortBy[collection].direction, sortBy[collection].type)
        };
        case "partCollection_ConversionKit":{
            return sortPartCollection_ConversionKit(sortBy[collection].direction, sortBy[collection].type)
        };
        case "partCollection_Barrel":{
            return sortPartCollection_Barrel(sortBy[collection].direction, sortBy[collection].type)
        };
    }
}

export function determineSearchQueryFields(collection:CollectionType, searchQuery:string){
    switch(collection){
        
        case "gunCollection":{
            return or(like(sql`COALESCE(${schema[collection].model}, '')`, `%${searchQuery}%`),
                 like(sql`COALESCE(${schema[collection].manufacturer}, '')`, `%${searchQuery}%`))
        }
        case "ammoCollection":{
            return  or(like(sql`COALESCE(${schema[collection].designation}, '')`, `%${searchQuery}%`),
                like(sql`COALESCE(${schema[collection].manufacturer}, '')`, `%${searchQuery}%`))
        }
        case "accessoryCollection_Silencer":{
            return or(like(sql`COALESCE(${schema[collection].model}, '')`, `%${searchQuery}%`),
                 like(sql`COALESCE(${schema[collection].manufacturer}, '')`, `%${searchQuery}%`))
        }
        case "accessoryCollection_Optic":{
            return or(like(sql`COALESCE(${schema[collection].model}, '')`, `%${searchQuery}%`),
                 like(sql`COALESCE(${schema[collection].manufacturer}, '')`, `%${searchQuery}%`))
        }
        case "accessoryCollection_Scope":{
            return or(like(sql`COALESCE(${schema[collection].model}, '')`, `%${searchQuery}%`),
                 like(sql`COALESCE(${schema[collection].manufacturer}, '')`, `%${searchQuery}%`))
        }
        case "accessoryCollection_LightLaser":{
            return or(like(sql`COALESCE(${schema[collection].model}, '')`, `%${searchQuery}%`),
                 like(sql`COALESCE(${schema[collection].manufacturer}, '')`, `%${searchQuery}%`))
        }
        case "accessoryCollection_Magazine":{
            return or(like(sql`COALESCE(${schema[collection].model}, '')`, `%${searchQuery}%`),
                 like(sql`COALESCE(${schema[collection].manufacturer}, '')`, `%${searchQuery}%`))
        }
        case "accessoryCollection_Misc":{
            return or(like(sql`COALESCE(${schema[collection].model}, '')`, `%${searchQuery}%`),
                 like(sql`COALESCE(${schema[collection].manufacturer}, '')`, `%${searchQuery}%`))
        }
        case "partCollection_ConversionKit":{
            return or(like(sql`COALESCE(${schema[collection].model}, '')`, `%${searchQuery}%`),
                 like(sql`COALESCE(${schema[collection].manufacturer}, '')`, `%${searchQuery}%`))
        }
        case "partCollection_Barrel":{
            return or(like(sql`COALESCE(${schema[collection].model}, '')`, `%${searchQuery}%`),
                 like(sql`COALESCE(${schema[collection].manufacturer}, '')`, `%${searchQuery}%`))
        }
    }
}

export function determineDataTemplate(collection: CollectionType){
    switch(collection){
        case "gunCollection": 
            return gunDataTemplate
        case "ammoCollection":
            return ammoDataTemplate
        case "accessoryCollection_Silencer":
            return accessoryDataTemplate_Silencer
        case "accessoryCollection_Optic":
            return accessoryDataTemplate_Optic
        case "accessoryCollection_Scope":
            return accessoryDataTemplate_Scope
        case "accessoryCollection_LightLaser":
            return accessoryDataTemplate_LightLaser
        case "accessoryCollection_Magazine":
            return accessoryDataTemplate_Magazine
        case "accessoryCollection_Misc":
            return accessoryDataTemplate_Misc
        case "partCollection_ConversionKit":
            return partDataTemplate_ConversionKit
        case "partCollection_Barrel":
            return partDataTemplate_Barrel
    }
}

export function determineRemarkDataTemplate(collection: CollectionType){
    switch(collection){
        case "gunCollection": 
            return gunRemarks
        case "ammoCollection":
            return ammoRemarks
         case "accessoryCollection_Silencer":
            return silencerRemarks
        case "accessoryCollection_Optic":
            return opticRemarks
        case "accessoryCollection_Scope":
            return scopeRemarks
        case "accessoryCollection_LightLaser":
            return lightLaserRemarks
        case "accessoryCollection_Magazine":
            return magazineRemarks
        case "accessoryCollection_Misc":
            return miscAccessoryRemarks
        case "partCollection_ConversionKit":
            return conversionKitRemarks
        case "partCollection_Barrel":
            return barrelRemarks
    }
}

export function determineEmptyObject(collection: CollectionType){
    switch(collection){
        case "gunCollection": 
            return emptyGunObject
        case "ammoCollection":
            return emptyAmmoObject
        case "accessoryCollection_Silencer":
            return emptySilencerObject
        case "accessoryCollection_Optic":
            return emptyOpticObject
        case "accessoryCollection_Scope":
            return emptyScopeObject
        case "accessoryCollection_LightLaser":
            return emptyLightLaserObject
        case "accessoryCollection_Magazine":
            return emptyMagazineObject
        case "accessoryCollection_Misc":
            return emptyMiscAccessoryObject
        case "partCollection_ConversionKit":
            return emptyConversionKitObject
        case "partCollection_Barrel":
            return emptyBarrelObject
    }
}

export function determineEmptyObjectReturns(collection: CollectionType){
    switch(collection){
        case "gunCollection": 
            return {...emptyGunObject}
        case "ammoCollection":
            return {...emptyAmmoObject}
        case "accessoryCollection_Silencer":
            return {...emptySilencerObject}
        case "accessoryCollection_Optic":
            return {...emptyOpticObject}
        case "accessoryCollection_Scope":
            return {...emptyScopeObject}
        case "accessoryCollection_LightLaser":
            return {...emptyLightLaserObject}
        case "accessoryCollection_Magazine":
            return {...emptyMagazineObject}
        case "accessoryCollection_Misc":
            return {...emptyMiscAccessoryObject}
        case "partCollection_ConversionKit":
            return {...emptyConversionKitObject}
        case "partCollection_Barrel":
            return {...emptyBarrelObject}
    }
}

export function determineRequiredFields(collection: CollectionType){
    switch(collection){
        case "gunCollection": 
            return requiredFieldsGun
        case "ammoCollection":
            return requiredFieldsAmmo
        case "accessoryCollection_Silencer":
            return requiredFieldsAccessory_Silencer
        case "accessoryCollection_Optic":
            return requiredFieldsAccessory_Optic
        case "accessoryCollection_Scope":
            return requiredFieldsAccessory_Scope
        case "accessoryCollection_LightLaser":
            return requiredFieldsAccessory_LightLaser
        case "accessoryCollection_Magazine":
            return requiredFieldsAccessory_Magazine
        case "accessoryCollection_Misc":
            return requiredFieldsAccessory_Misc
        case "partCollection_ConversionKit":
            return requiredFieldsPart_ConversionKit
        case "partCollection_Barrel":
            return requiredFieldsPart_Barrel
    }
}

export function determineSortingOptions(collection: CollectionType){
    switch(collection){
        case "gunCollection": 
            return sortingOptionsGun
        case "ammoCollection":
            return sortingOptionsAmmo
        case "accessoryCollection_Silencer":
            return sortingOptionsAccessory_Silencer
        case "accessoryCollection_Optic":
            return sortingOptionsAccessory_Optic
        case "accessoryCollection_Scope":
            return sortingOptionsAccessory_Scope
        case "accessoryCollection_LightLaser":
            return sortingOptionsAccessory_LightLaser
        case "accessoryCollection_Magazine":
            return sortingOptionsAccessory_Magazine
        case "accessoryCollection_Misc":
            return sortingOptionsAccessory_Misc
        case "partCollection_ConversionKit":
            return sortingOptionsPart_ConversionKit
        case "partCollection_Barrel":
            return sortingOptionsPart_Barrel
    }
}

export function determineCardOptions(collection: CollectionType){
    switch(collection){
        case "gunCollection": 
            return cardActionsGun
        case "ammoCollection":
            return cardActionsAmmo
        case "accessoryCollection_Silencer":
            return cardActionsAccessory_Silencer
        case "accessoryCollection_Optic":
            return cardActionsAccessory_Optic
        case "accessoryCollection_Scope":
            return cardActionsAccessory_Scope
        case "accessoryCollection_LightLaser":
            return cardActionsAccessory_LightLaser
        case "accessoryCollection_Magazine":
            return cardActionsAccessory_Magazine
        case "accessoryCollection_Misc":
            return cardActionsAccessory_Misc
        case "partCollection_ConversionKit":
            return cardActionsPart_ConversionKit
        case "partCollection_Barrel":
            return cardActionsPart_Barrel
    }
}

export function determineAccessoryIcons(collection: CollectionType){
    switch(collection){
        case "gunCollection":
            return "pistol"
        case "ammoCollection":
            return "ammunition"
        case "accessoryCollection_Silencer":
            return "volume-mute"
        case "accessoryCollection_Optic":
            return "toslink"
        case "accessoryCollection_Scope":
            return "crosshairs"
        case "accessoryCollection_LightLaser":
            return "spotlight-beam"
        case "accessoryCollection_Magazine":
            return "magazine-pistol"
        case "accessoryCollection_Misc":
            return "help-circle-outline"
        case "partCollection_ConversionKit":
            return "cog-transfer-outline"
        case "partCollection_Barrel":
            return "lightbulb-fluorescent-tube-outline"
    /*  case "reloadingCollection_Die":
            return "lightbulb-cfl-spiral" */
    /*  case "reloadingCollection_Powder":
            return "sprinkler-fire" */
    /*  case "reloadingCollection_Primer":
            return "fire-circle" */
    }
}

export function determineTabBarLabel(collection: CollectionType){
    switch(collection){
        case "gunCollection": 
            return tabBarLabels.gunCollection
        case "ammoCollection":
            return tabBarLabels.ammoCollection
        case "accessoryCollection_Silencer":
            return tabBarLabels.silencerCollection
        case "accessoryCollection_Optic":
            return tabBarLabels.opticCollection
        case "accessoryCollection_Scope":
            return tabBarLabels.scopeCollection
        case "accessoryCollection_LightLaser":
            return tabBarLabels.lightLaserCollection
        case "accessoryCollection_Magazine":
            return tabBarLabels.magazineCollection
        case "accessoryCollection_Misc":
            return tabBarLabels.miscAccessoryCollection
        case "partCollection_ConversionKit":
            return tabBarLabels.conversionCollection
        case "partCollection_Barrel":
            return tabBarLabels.barrelCollection
    }
}

export function determineNewItemTitle(collection: CollectionType){
    if(collection.startsWith("gun")){
        return newGunTitle
    }
    if(collection.startsWith("ammo")){
        return newAmmoTitle
    }
    if(collection.startsWith("accessoryCollection_")){
        return newAccessoryTitle
    }
    if(collection.startsWith("partCollection_")){
        return newPartTitle
    }
}

export function determineEditItemTitle(collection: CollectionType){
    if(collection.startsWith("gun")){
        return editGunTitle
    }
    if(collection.startsWith("ammo")){
        return editAmmoTitle
    }
    if(collection.startsWith("accessoryCollection_")){
        return editAccessoryTitle
    }
    if(collection.startsWith("partCollection_")){
        return editPartTitle
    }
}

export function determineCardTitle(collection: CollectionType, itemIn: ItemType){
    switch(collection){
        case "gunCollection": 
            {   const item = itemIn as GunType
                return `${item.manufacturer && item.manufacturer.length != 0 ? `${item.manufacturer}` : ""}${item.manufacturer && item.manufacturer.length != 0 ? ` ` : ""}${item.model}`
            }
        case "ammoCollection":
            {   const item = itemIn as AmmoType
                return `${item.manufacturer && item.manufacturer.length != 0 ? `${item.manufacturer}` : ""}${item.manufacturer && item.manufacturer.length != 0 ? ` ` : ""}${item.designation}`
            }
        case "accessoryCollection_Silencer":
            {   const item = itemIn as AccessoryType_Silencer
                return `${item.manufacturer && item.manufacturer.length != 0 ? `${item.manufacturer}` : ""}${item.manufacturer && item.manufacturer.length != 0 ? ` ` : ""}${item.model}`
            }
        case "accessoryCollection_Optic":
            {   const item = itemIn as AccessoryType_Optic
                return `${item.manufacturer && item.manufacturer.length != 0 ? `${item.manufacturer}` : ""}${item.manufacturer && item.manufacturer.length != 0 ? ` ` : ""}${item.model}`
            }
        case "accessoryCollection_Scope":
            {   const item = itemIn as AccessoryType_Scope
                return `${item.manufacturer && item.manufacturer.length != 0 ? `${item.manufacturer}` : ""}${item.manufacturer && item.manufacturer.length != 0 ? ` ` : ""}${item.model}`
            }
        case "accessoryCollection_LightLaser":
            {   const item = itemIn as AccessoryType_LightLaser
                return `${item.manufacturer && item.manufacturer.length != 0 ? `${item.manufacturer}` : ""}${item.manufacturer && item.manufacturer.length != 0 ? ` ` : ""}${item.model}`
            }
        case "accessoryCollection_Magazine":
            {   const item = itemIn as AccessoryType_Magazine
                return `${item.manufacturer && item.manufacturer.length != 0 ? `${item.manufacturer}` : ""}${item.manufacturer && item.manufacturer.length != 0 ? ` ` : ""}${item.model}`
            }
        case "accessoryCollection_Misc":
            {   const item = itemIn as AccessoryType_Misc
                return `${item.manufacturer && item.manufacturer.length != 0 ? `${item.manufacturer}` : ""}${item.manufacturer && item.manufacturer.length != 0 ? ` ` : ""}${item.model}`
            }
        case "partCollection_ConversionKit":
            {   const item = itemIn as PartType_ConversionKit
                return `${item.manufacturer && item.manufacturer.length != 0 ? `${item.manufacturer}` : ""}${item.manufacturer && item.manufacturer.length != 0 ? ` ` : ""}${item.model}`
            }
        case "partCollection_Barrel":
            {   const item = itemIn as PartType_Barrel
                return `${item.manufacturer && item.manufacturer.length != 0 ? `${item.manufacturer}` : ""}${item.manufacturer && item.manufacturer.length != 0 ? ` ` : ""}${item.model}`
            }
    }
}

export function determineCardSubtitle(collection: CollectionType, itemIn: ItemType, language:Languages){
    switch(collection){
        case "gunCollection": 
            {   const item = itemIn as GunType
                return item.serial && item.serial.length != 0 ? item.serial : ""
            }
        case "ammoCollection":
            {   const item = itemIn as AmmoType
                return item.caliber ? item.caliber : ""
            }
        case "accessoryCollection_Silencer":
            {   const item = itemIn as AccessoryType_Silencer
                return item.caliber ? item.caliber : ""
            }
        case "accessoryCollection_Optic":
            {   const item = itemIn as AccessoryType_Optic
                return item.zoom ? item.zoom : ""
            }
        case "accessoryCollection_Scope":
            {   const item = itemIn as AccessoryType_Scope
                return item.zoom ? item.zoom : ""
            }
        case "accessoryCollection_LightLaser":
            {   const item = itemIn as AccessoryType_LightLaser
                return item.serial && item.serial.length != 0 ? item.serial : ""
            }
        case "accessoryCollection_Magazine":
            {   const item = itemIn as AccessoryType_Magazine
                const capacity = item.capacity ? `${item.capacity} ${shotLabel[language]}` : ""
                const caliber = item.caliber ? item.caliber : ""
                return `${capacity} ${caliber}`
            }
        case "accessoryCollection_Misc":
            {   const item = itemIn as AccessoryType_Misc
                return ""
            }
        case "partCollection_ConversionKit":
            {   const item = itemIn as PartType_ConversionKit
                return item.serial && item.serial.length != 0 ? item.serial : ""
            }
        case "partCollection_Barrel":
            {   const item = itemIn as PartType_Barrel
                return item.caliber ? item.caliber : ""
            }
    }
}