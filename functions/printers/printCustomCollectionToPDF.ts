import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as IntentLauncher from 'expo-intent-launcher';
import * as FileSystem from 'expo-file-system/legacy';
import { CollectionType, ListPrinter } from 'lib/interfaces';
import { pdfFooter, pdfTitle_AmmoCollection } from 'lib/textTemplates';
import { dateLocales, datePickerTriggerFields, pdfCommonStyles, pdfDateOptions } from 'configs/configs';
import { ammoDataTemplate } from 'lib/DataTemplates/ammoDataTemplate';
import { Platform } from 'react-native';
import { db } from 'db/client';
import * as schema from "db/schema"
import { checkConversionFields, getShortCaliberNameFromArray, parseDate } from 'functions/utils';
import * as Application from 'expo-application';
import { tableStyle } from './printoutStyles';
import { PreferredUnits } from 'stores/usePreferenceStore';
import { useState } from 'react';
import { determineDataTemplate } from 'functions/determinators';

export async function printCustomCollection(
  language: string, 
  shortCaliber: boolean, 
  caliberDisplayNameList: {name:string, displayName?:string}[], 
  collection: CollectionType,
  includedKeys: string[],
  preferredUnits:PreferredUnits,
  title: string
){

  console.log(includedKeys)
  console.log(collection)
  const customCollection = db.select().from(schema[collection]).all()
  const customTemplate = determineDataTemplate(collection)

  const date:Date = new Date()

  function getHeaderFooterLength(){
  const columnTitles = customTemplate.filter(data => includedKeys.includes(data.name))
    return columnTitles.length
  }

  const generatedDate:string = date.toLocaleDateString(dateLocales[language], pdfDateOptions)

  const html = `
    <html>
      <body>
        <div class="bodyContent">
          <table>
            <thead>
              <tr>
                <th colspan=${getHeaderFooterLength()}>${title}</th>
              </tr>
              <tr>
                ${customTemplate.map(data=>{return !includedKeys.includes(data.name) ? null : `<th>${data[language]}</th>`}).join("")}
              </tr>
            </thead>

            <tbody>
              ${(customCollection as any).map(ammo =>{
                return `
                  <tr>
                    ${determineDataTemplate(collection).map(data=>{
                      return(
                        data.name in ammo && includedKeys.includes(data.name) ? 
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
                        !(data.name in ammo) && includedKeys.includes(data.name) ? 
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
                <td colspan=${getHeaderFooterLength()}>
                  ${pdfFooter[language].replace("{{{A}}}", Application.applicationName).replace("{{{B}}}", Platform.OS)} ${Application.nativeApplicationVersion}, ${generatedDate}
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