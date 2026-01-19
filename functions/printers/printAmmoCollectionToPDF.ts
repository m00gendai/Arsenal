import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as IntentLauncher from 'expo-intent-launcher';
import * as FileSystem from 'expo-file-system';
import { ListPrinter } from 'lib/interfaces';
import { pdfFooter, pdfTitle } from 'lib/textTemplates';
import { dateLocales, datePickerTriggerFields, pdfCommonStyles, pdfDateOptions } from 'configs/configs';
import { ammoDataTemplate } from 'lib/DataTemplates/ammoDataTemplate';
import { Platform } from 'react-native';
import { db } from 'db/client';
import * as schema from "db/schema"
import { checkConversionFields, getShortCaliberNameFromArray, parseDate } from 'functions/utils';
import * as Application from 'expo-application';
import { tableStyle } from './printoutStyles';
import { PreferredUnits } from 'stores/usePreferenceStore';

const excludedKeys = [
    "images", 
    "createdAt", 
    "lastModifiedAt", 
    "lastTopUpAt",
    "lastTopUpAt_unix",
    "id", 
    "tags", 
    "remarks", 
    "manufacturingDate", 
    "originCountry", 
    "currentStock", 
    "criticalStock", 
    "previousStock",
    "customInventoryDesignation"
]  

function getHeaderFooterLength(printer:ListPrinter){
  const columnTitles = ammoDataTemplate.filter(data => !excludedKeys.includes(data.name))
  switch(printer){
    case "ammoCollection":
      return columnTitles.length
  }
}

export async function printAmmoCollection(language: string, shortCaliber: boolean, caliberDisplayNameList: {name:string, displayName?:string}[], printer:ListPrinter, preferredUnits:PreferredUnits){

  const ammoCollection = db.select().from(schema.ammoCollection).all()

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
                ${ammoDataTemplate.map(data=>{return excludedKeys.includes(data.name) ? null : `<th>${data[language]}</th>`}).join("")}
              </tr>
            </thead>

            <tbody>
              ${(ammoCollection as any).map(ammo =>{
                return `
                  <tr>
                    ${ammoDataTemplate.map(data=>{
                      return(
                        data.name in ammo && !excludedKeys.includes(data.name) ? 
                          `<td>${"caliber" in ammo && data.name === "caliber" ? 
                            getShortCaliberNameFromArray(ammo.caliber, caliberDisplayNameList, shortCaliber).join(",<br>") 
                            : 
                            datePickerTriggerFields.includes(data.name) ? 
                              parseDate(ammo[data.name]) 
                              : 
                              ammo[data.name] ? 
                                checkConversionFields(ammo, data.name, preferredUnits) 
                                : 
                                ""}</td>` 
                        : 
                        !(data.name in ammo) && !excludedKeys.includes(data.name) ? 
                          `<td></td>`
                          : 
                          ""
                        )
                    }).join("")}
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
    });
  
    await shareAsync(file.uri);
  } else if(Platform.OS === "android"){
    
    const { uri } = await Print.printToFileAsync({html, height:595, width:842, margins: {top: pdfCommonStyles.allPageMarginIOS, right: pdfCommonStyles.allPageMarginIOS, bottom: pdfCommonStyles.allPageMarginIOS, left: pdfCommonStyles.allPageMarginIOS}});
    
    const cUri = await FileSystem.getContentUriAsync(uri)
    await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
      data: cUri,
      flags: 1,
      type: 'application/pdf'
    });
  };
}