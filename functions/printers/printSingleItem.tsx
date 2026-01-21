import { CollectionType, ItemType } from "lib/interfaces";
import * as FileSystem from 'expo-file-system';
import { dateLocales, datePickerTriggerFields, legacyDatePickerTriggerFields, pdfCommonStyles, pdfDateOptions, pdfExcludedKeys } from "configs/configs";
import { checkBoxes, gunRemarks } from "lib/DataTemplates/gunDataTemplate";
import { determineDataTemplate } from "functions/determinators";
import { newTags, pdfFooter } from "lib/textTemplates";
import { getShortCaliberNameFromArray, parseDate } from "functions/utils";
import { Platform } from "react-native";
import * as Print from 'expo-print';
import { shareAsync } from "expo-sharing";
import * as IntentLauncher from 'expo-intent-launcher';
import { galleryStyle } from "./printoutStyles";
import * as Application from 'expo-application';


export async function printSingleItem(item:ItemType, collection: CollectionType, language: string, shortCaliber: boolean, caliberDisplayNameList: {name:string, displayName?:string}[]){

    let imgs: null | string[] = null
    if(item.images && item.images.length !== 0){
        imgs = await Promise.all(item.images.map(async image =>{
            return await FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}${image.split("/").pop()}`, { encoding: 'base64' });
        }))
    }

    const date:Date = new Date()
    const generatedDate:string = date.toLocaleDateString(dateLocales[language], pdfDateOptions)

    const art5Keys = checkBoxes.map(checkBox => checkBox.name)

    const excludedKeys = [...pdfExcludedKeys, ...art5Keys, ...legacyDatePickerTriggerFields];
    const gunHasArt5Key = art5Keys.filter(art5 => {return item[art5] === true})

    function getTitle(item:ItemType){
        if("manufacturer" in item){
            return `${item.manufacturer ? item.manufacturer : ""} ${"model" in item ? item.model : item.designation}`
        }
        if("title" in item){
            return `${item.title}`
        }
    }

    function getTranslation(key: string, language: string, collection: CollectionType) {
        const data = determineDataTemplate(collection).find(item => item.name === key);
        const remarks = gunRemarks.name === key ? gunRemarks[language] : null
        const boxes = checkBoxes.find(item => item.name === key);
        const tags = newTags.name === key ? newTags[language] : null
        
        return data ? data[language] : remarks ? remarks : boxes ? boxes[language] : tags ? tags : key;
    }

    const html = `
        <html>
            <body>
                <div class="bodyContent">
                    <h1>${getTitle(item)}</h1>
                    ${item.images && item.images.length !== 0 ? `<div class="imageContainer">${imgs.map(img => {return `<div class="imageDiv"><img class="image" src="data:image/jpeg;base64,${img}" /></div>`}).join("")}</div>`: ""}
                    ${item.tags && item.tags.length !== 0 ? `<div class="tagContainer">${item.tags.map(tag => {return `<div class="tag">${tag}</div>`}).join("")}</div>` : ""}
                    ${item.tags && item.tags.length !== 0 ? `<hr />` : ""}
                    ${gunHasArt5Key.length !== 0 ? `<div class="tagContainer">${gunHasArt5Key.map(art5 => {return `<div class="tag">${getTranslation(art5, language, collection)}</div>`}).join("")}</div>` : ""}
                    <table>
                        <tbody>
                            ${Object.entries(item).map(entry =>{
                                return excludedKeys.includes(entry[0]) ? 
                                null 
                                :
                                `<tr>
                                    <td>
                                        <strong>
                                            ${getTranslation(entry[0], language, collection)}
                                        </strong>
                                    </td>
                                    <td>
                                        ${entry[0] === "caliber" ? getShortCaliberNameFromArray(entry[1], caliberDisplayNameList, shortCaliber).join("<br>") : entry[1] === null ? "" : datePickerTriggerFields.includes(entry[0]) ? parseDate(entry[1]) : entry[1]}
                                    </td>
                                </tr>`
                            }).join("")}
                            <tr>
                                <td colspan="2">
                                    <strong>
                                        ${gunRemarks[language]}
                                    </strong>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    ${item.remarks ? item.remarks : ""}
                                </td>
                            </tr>

                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="2">
                                    ${getTitle(item)}: ${pdfFooter[language].replace("{{{A}}}", Application.applicationName).replace("{{{B}}}", Platform.OS)} ${Application.nativeApplicationVersion}, ${generatedDate}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </body>
            
            <style>
                ${galleryStyle}
            </style>
        </html>
    `

    if (Platform.OS === 'ios') {
        const file = await Print.printToFileAsync({
            html: html,
            height:842, 
            width:595, 
            margins: {top: pdfCommonStyles.allPageMarginIOS, right: pdfCommonStyles.allPageMarginIOS, bottom: pdfCommonStyles.allPageMarginIOS, left: pdfCommonStyles.allPageMarginIOS},
            base64: true
        })
        
        await shareAsync(file.uri);

    } else if(Platform.OS === "android"){
        const { uri } = await Print.printToFileAsync({html, height:595, width:842, margins: {top: pdfCommonStyles.allPageMarginIOS, right: pdfCommonStyles.allPageMarginIOS, bottom: pdfCommonStyles.allPageMarginIOS, left: pdfCommonStyles.allPageMarginIOS}});
        const cUri = await FileSystem.getContentUriAsync(uri)
        
        await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
            data: cUri,
            flags: 1,
            type: 'application/pdf'
        })
    }      
}