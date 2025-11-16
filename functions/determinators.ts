import { CollectionType } from "interfaces";
import sortGunCollection from "./sortGunCollection";
import { SorterSettings } from "stores/usePreferenceStore";
import sortAmmoCollection from "./sortAmmoCollection";
import * as schema from "db/schema"
import { and, or, like, sql } from 'drizzle-orm';
import { emptyGunObject, gunDataTemplate, gunRemarks } from "lib/DataTemplates/gunDataTemplate";
import { ammoDataTemplate, ammoRemarks, emptyAmmoObject } from "lib/DataTemplates/ammoDataTemplate";
import { cardActionsAccessory_Silencer, cardActionsAmmo, cardActionsGun, requiredFieldsAccessory_Silencer, requiredFieldsAmmo, requiredFieldsGun, sortingOptionsAccessory_Silencer, sortingOptionsAmmo, sortingOptionsGun } from "configs";
import sortAccessoryCollection_Silencer from "./sortAccessoryCollection_Silencer";
import { accessoryDataTemplate_Silencer, emptySilencerObject, silencerRemarks } from "lib/DataTemplates/accessoryDataTemplate_Silencer";

export function determineSchema(collection:CollectionType){
    switch(collection){
        case "gunCollection":
            return schema.gunCollection
        case "ammoCollection":
            return schema.ammoCollection
        case "accessoryCollection_Silencer":
            return schema.accessoryCollection_Silencer
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
    }
}

export function determineSortingFunction(collection:CollectionType, sortBy: SorterSettings){
    console.log(`determineSortingFunction for ${collection}`)
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
    }
}