import { CollectionType } from "interfaces";
import sortGunCollection from "./sortGunCollection";
import { SorterSettings } from "stores/usePreferenceStore";
import sortAmmoCollection from "./sortAmmoCollection";
import * as schema from "db/schema"
import { and, or, like, sql } from 'drizzle-orm';
import { emptyGunObject, gunDataTemplate, gunRemarks } from "lib/DataTemplates/gunDataTemplate";
import { ammoDataTemplate, ammoRemarks, emptyAmmoObject } from "lib/DataTemplates/ammoDataTemplate";
import { cardActionsAccessory_Optic, cardActionsAccessory_Silencer, cardActionsAmmo, cardActionsGun, requiredFieldsAccessory_Optic, requiredFieldsAccessory_Silencer, requiredFieldsAmmo, requiredFieldsGun, sortingOptionsAccessory_Optic, sortingOptionsAccessory_Silencer, sortingOptionsAmmo, sortingOptionsGun } from "configs";
import sortAccessoryCollection_Silencer from "./sortAccessoryCollection_Silencer";
import { accessoryDataTemplate_Silencer, emptySilencerObject, silencerRemarks } from "lib/DataTemplates/accessoryDataTemplate_Silencer";
import sortAccessoryCollection_Optic from "./sortAccessoryCollection_Optic";
import { accessoryDataTemplate_Optic, emptyOpticObject, opticRemarks } from "lib/DataTemplates/accessoryDataTemplate_Optic";

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
    }
}