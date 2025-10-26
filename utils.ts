import { AmmoType, GunType, SortingTypes } from "./interfaces";
import { gunDataTemplate } from "./lib/gunDataTemplate";
import { validationErros } from "./lib//textTemplates";
import { ammoDataTemplate } from "./lib/ammoDataTemplate";
import { requiredFieldsAmmo, requiredFieldsGun } from "./configs";
import * as ImagePicker from "expo-image-picker"
import { ImageResult, manipulateAsync } from 'expo-image-manipulator';
import { Alert, Image } from "react-native"
import * as schema from "./db/schema"

const nonSetValue: number = 999999999999999

export function getSortAlternateValue(sortBy:SortingTypes){
    switch(sortBy){
        case "alphabetical":
            return ""
        case "caliber":
            return ""
        case "acquisitionDate":
            return nonSetValue
        case "createdAt":
            return schema.gunCollection.createdAt
        case "lastCleanedAt":
            return nonSetValue
        case "lastModifiedAt":
            return schema.gunCollection.createdAt
        case "lastShotAt":
            return nonSetValue
        case "marketValue":
            return nonSetValue
        case "paidPrice":
            return nonSetValue
    }
}

export function getIcon(type:SortingTypes){
    switch(type){
        case "alphabetical":
            return "alphabetical-variant"
        case "createdAt":
            return "clock-plus-outline"
        case "lastModifiedAt":
            return "clock-edit-outline"
        case "paidPrice":
            return "cash-register"
        case "marketValue":
            return "chart-line"
        case "acquisitionDate":
            return "credit-card-clock-outline"
        case "lastCleanedAt":
            return "toothbrush"
        case "lastShotAt":
            return "bullseye"
        default:
            return "alphabetical-variant"
    }
}

export function gunDataValidation(value:GunType, lang:string){
    let validationResponse: {field: string, error: string}[] = []
    const requiredFields: string[] = requiredFieldsGun
    const x:{de: string, en: string, fr: string}[] = gunDataTemplate.filter(item => requiredFields.includes(item.name))
    for(const entry of requiredFields){
       if( !(entry in value) || value[entry].length == 0 ){
        validationResponse = [...validationResponse, {field: x[0][lang], error: validationErros.requiredFieldEmpty[lang]}]
       }
    }
    return validationResponse
}

export function ammoDataValidation(value:AmmoType, lang:string){
    let validationResponse: {field: string, error: string}[] = []
    const requiredFields: string[] = requiredFieldsAmmo
    const x:{de: string, en: string, fr: string}[] = ammoDataTemplate.filter(item => requiredFields.includes(item.name))
    for(const entry of requiredFields){
       if( !(entry in value) || value[entry].length == 0 ){
        validationResponse = [...validationResponse, {field: x[0][lang], error: validationErros.requiredFieldEmpty[lang]}]
       }
    }
    return validationResponse
}

export async function imageHandling(result:ImagePicker.ImagePickerResult, resizeImages:boolean){
    if(!resizeImages){
        return result.assets[0]
    }
    const imageWidth:number = result.assets[0].width
    const imageHeight: number = result.assets[0].height
    if(imageWidth >= imageHeight && imageWidth <= 1000){
        return result.assets[0]
    }
    if(imageHeight >= imageWidth && imageHeight <= 1000){
        return result.assets[0]
    }
    const altered:ImageResult = await manipulateAsync(
        result.assets[0].uri,
        [{resize: imageWidth >= imageHeight ? {width: 1000} : {height: 1000}}],
        {compress: 1}
    );
    return altered
}

export function getImageSize(base64ImageUri){
    return new Promise((resolve, reject) => {
        Image.getSize(base64ImageUri, (width, height) => {
            if (width && height) {
                resolve({ width: width, height: height });
            } else {
                reject({ width: 0, height: 0 });
            }
        });
    });
};

export function sanitizeFileName(fileName) {
    // Define the forbidden characters for Windows, macOS, and Linux
    const forbiddenCharacters = /[\\/:*?"<>|]/g;
    
    // Replace forbidden characters with an underscore
    let sanitized = fileName.replace(forbiddenCharacters, '_');
    
    // Trim leading and trailing spaces and periods
    sanitized = sanitized.replace(/^[\s.]+|[\s.]+$/g, '');
    
    return sanitized;
}

function mapIntervals(interval){
    switch(interval){
        case "day_1":
            return 1
        case "day_7":
            return 7
        case "day_14":
            return 14
        case "month_1":
            return 30
        case "month_3":
            return 90
        case "month_6":
            return 180
        case "month_9":
            return 270
        case "year_1":
            return 365
        case "year_5":
            return 365*5
        case "year_10":
            return 3650
        default:
            return 0
    }
}

export function checkDate(gun:GunType){
    if(gun === undefined){
        return
    }
    if(gun.lastCleanedAt === undefined){
        return
    }
    if(gun.lastCleanedAt === null){
        return
    }
    if(gun.cleanInterval === undefined){
        return
    }
    if(gun.cleanInterval === "none"){
        return
    }
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    let [day, month, year] = gun.lastCleanedAt.split('.')
    const firstDate = new Date(Number(year), Number(month) - 1, Number(day)).getTime()
    const todayYear = new Date().getFullYear()
    const todayMonth = new Date().getMonth()
    const todayDay = new Date().getDate()
    const secondDate = new Date(todayYear, todayMonth, todayDay).getTime()
    const diffDays = Math.round(Math.abs((Number(firstDate) - Number(secondDate)) / oneDay));
    if(diffDays > mapIntervals(gun.cleanInterval)){
        return true
    }
    return false
}

export function alarm(title: string, error:string){
    Alert.alert(`${title}`, `${error}`, [
      {
        text: 'OK',
        onPress: () => {return},
      },
    ])
  }