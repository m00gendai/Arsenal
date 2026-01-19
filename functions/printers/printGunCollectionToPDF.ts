import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as IntentLauncher from 'expo-intent-launcher';
import * as FileSystem from 'expo-file-system';
import { ListPrinter } from 'lib/interfaces';
import { checkBoxes, gunDataTemplate } from 'lib/DataTemplates/gunDataTemplate';
import { pdfFooter, pdfTitle } from 'lib/textTemplates';
import { dateLocales, datePickerTriggerFields, pdfCommonStyles, pdfDateOptions } from 'configs/configs';
import { Platform } from 'react-native';
import { db } from 'db/client';
import * as schema from "db/schema"
import { checkConversionFields, getShortCaliberNameFromArray, parseDate } from 'functions/utils';
import * as Application from 'expo-application';
import { tableStyle } from './printoutStyles';
import { PreferredUnits } from 'stores/usePreferenceStore';

const art5Keys = checkBoxes.map(checkBox => checkBox.name)

const excludedKeys = [
    "images", 
    "createdAt", 
    "lastModifiedAt", 
    "status", 
    "id", 
    "tags", 
    "remarks", 
    "manufacturingDate", 
    "originCountry", 
    "paidPrice", 
    "shotCount", 
    "mainColor", 
    "lastCleanedAt", 
    "lastCleanedAt_unix", 
    "cleanInterval", 
    "cleanInterval_CustomTime",
    "cleanInterval_ShotCount",
    "cleanIntervalDisplay",
    "lastShotAt", 
    "lastShotAt_unix", 
    "marketValue", 
    "boughtFrom",
    "customInventoryDesignation"
  ]

function sortGuns(gunCollection, printer: ListPrinter){
  switch(printer){
    case "gunCollection": {
      return gunCollection.sort((a, b) =>{
          const x = a.manufacturer
          const y = b.manufacturer
          return x > y ? 1 : x < y ? -1 : 0
        })
    }
    case "gunCollectionHybrid": {
      return gunCollection.sort((a, b) =>{
          const x = a.manufacturer
          const y = b.manufacturer
          return x > y ? 1 : x < y ? -1 : 0
        })
    }
    case "gunCollectionArt5": {
      const gunHasArt5Key = gunCollection.filter(gun => {return art5Keys.some(art5 => gun[art5] === true)})
      return gunHasArt5Key.sort((a, b) =>{
          const x = a.manufacturer
          const y = b.manufacturer
          return x > y ? 1 : x < y ? -1 : 0
        })
    }
  }
}

function checkForCheckboxes(printer:ListPrinter){
  switch(printer){
    case "gunCollection":
      return false
    case "gunCollectionArt5":
      return true
    case "gunCollectionHybrid":
      return true
  }
}

function getHeaderFooterLength(printer:ListPrinter){
  const columnTitles = gunDataTemplate.filter(data => !excludedKeys.includes(data.name))
  switch(printer){
    case "gunCollection":
      return columnTitles.length
    case "gunCollectionArt5":
      return columnTitles.length + checkBoxes.length
    case "gunCollectionHybrid":
      return columnTitles.length + checkBoxes.length
  }
}

export async function printGunCollection(language: string, shortCaliber: boolean, caliberDisplayNameList: {name:string, displayName?:string}[], printer: ListPrinter, preferredUnits: PreferredUnits){

  const gunCollection = db.select().from(schema.gunCollection).all()
  const guns = sortGuns(gunCollection, printer) 

  const date:Date = new Date()

  const generatedDate:string = date.toLocaleDateString(dateLocales[language], pdfDateOptions)
    
  const html = `
    <html>
      <body>
        <div class="bodyContent">
          <table>
            <thead>
              <tr colspan=${getHeaderFooterLength(printer)}>
                <th>${pdfTitle[language]}</th>
              </tr>
              <tr>
                ${gunDataTemplate.map(data=>{return excludedKeys.includes(data.name) ? "" : `<th>${data[language]}</th>`}).join("")}${checkForCheckboxes(printer) ? checkBoxes.map((box, index) => `<th>${index+1}</th>`).join("") : ""}
              </tr>
            </thead>
            
            <tbody>
              ${guns.map(gun =>{
                return `
                  <tr>
                    ${gunDataTemplate.map(data=>{
                      return(
                        data.name in gun && !excludedKeys.includes(data.name) ? 
                          `<td>${"caliber" in gun && data.name === "caliber" ? 
                            getShortCaliberNameFromArray(gun.caliber, caliberDisplayNameList, shortCaliber).join(",<br>") 
                            : 
                            datePickerTriggerFields.includes(data.name) ? 
                              parseDate(gun[data.name]) 
                              : 
                              gun[data.name] ? 
                                checkConversionFields(gun, data.name, preferredUnits)  
                                : 
                                ""}</td>` 
                        : 
                        !(data.name in gun) && !excludedKeys.includes(data.name) ? 
                          `<td></td>`
                          : 
                          ""
                        )
                    }).join("")}${checkForCheckboxes(printer) ? checkBoxes.map(box => {
                  return gun[box.name] === true ? 
                    `<td class="xcell">X</td>` 
                  : `<td class="hidden"> </td>`}).join("") : ""}
                  </tr>`
              }).join("")}
            </tbody>
            
            <tfoot>
              <tr>
                <td colspan=${getHeaderFooterLength(printer)}>
                  ${pdfFooter[language]}${Application.nativeApplicationVersion}, ${generatedDate}
                </td>
              </tr>
            </tfoot>

          </table>
        </div>
      </body>

      <style>
        ${tableStyle}
      </style>
      
    </html>
  `

  if (Platform.OS === 'ios') {
    const file = await Print.printToFileAsync({
      html: html,
      height:595, 
      width:842, 
      margins: {top: pdfCommonStyles.allPageMarginIOS, right: pdfCommonStyles.allPageMarginIOS, bottom: pdfCommonStyles.allPageMarginIOS, left: pdfCommonStyles.allPageMarginIOS},
    })

    await shareAsync(file.uri)
  
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

