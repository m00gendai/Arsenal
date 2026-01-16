import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as IntentLauncher from 'expo-intent-launcher';
import * as FileSystem from 'expo-file-system';
import { AmmoType, CollectionType, CommonStyles, GunType, ItemType } from 'lib/interfaces';
import { checkBoxes, gunDataTemplate, gunRemarks } from 'lib/DataTemplates/gunDataTemplate';
import { newTags, pdfTitleAmmo, pdfTitleArt5 } from 'lib/textTemplates';
import { pdfFooter, pdfTitle } from 'lib/textTemplates';
import { dateLocales, datePickerTriggerFields, dateTimeOptions, legacyDatePickerTriggerFields, pdfCommonStyles, pdfDateOptions, pdfExcludedKeys } from 'configs/configs';
import { ammoDataTemplate, ammoRemarks } from 'lib/DataTemplates/ammoDataTemplate';
import { Platform } from 'react-native';
import { db } from 'db/client';
import * as schema from "db/schema"
import { determineDataTemplate } from '../determinators';

const art5Keys = checkBoxes.map(checkBox => checkBox.name)

const getTranslation = (key: string, language: string, collection: CollectionType): string => {
  const data = determineDataTemplate(collection).find(item => item.name === key);
  const remarks = gunRemarks.name === key ? gunRemarks[language] : null
  const boxes = checkBoxes.find(item => item.name === key);
  const tags = newTags.name === key ? newTags[language] : null
  
  return data ? data[language] : remarks ? remarks : boxes ? boxes[language] : tags ? tags : key;
};

function parseDate(date: string){
  if(date === null){
    return ""
  }
  return new Date(date).toLocaleDateString("de-CH", dateTimeOptions)
}

function getShortCaliberNameFromArray(calibers:string[], displayNames:{name:string, displayName?:string}[], shortCaliber: boolean){
  if(!shortCaliber){
    console.log(calibers)
    return calibers
  }
    
  const outputArray = calibers.map(item => {
      // Find an object where displayName matches the item
      const match = displayNames.find(obj => obj.name === item)
      // If a match is found, return the displayName, else return the original item
      return match ? match.displayName : item;
    });
  return outputArray
}  

export async function printSingleItem(item:ItemType, collection: CollectionType, language: string, shortCaliber: boolean, caliberDisplayNameList: {name:string, displayName?:string}[]){

  let imgs: null | string[] = null
  if(item.images && item.images.length !== 0){
    imgs = await Promise.all(item.images.map(async image =>{
      return await FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}${image.split("/").pop()}`, { encoding: 'base64' });
    }))
  }

  const date:Date = new Date()
  const generatedDate:string = date.toLocaleDateString(dateLocales[language], pdfDateOptions)
    
  const excludedKeys = [...pdfExcludedKeys, ...art5Keys, ...legacyDatePickerTriggerFields];
  const gunHasArt5Key = art5Keys.filter(art5 => {return item[art5] === true})

  const html = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      </head>
      <body>
      <div class="bodyContent">
        <h1>${item.manufacturer ? item.manufacturer : ""} ${"model" in item ? item.model : item.designation}</h1>
        ${item.images && item.images.length !== 0 ? `<div class="imageContainer">${imgs.map(img => {return `<div class="imageDiv"><img class="image" src="data:image/jpeg;base64,${img}" /></div>`}).join("")}</div>`: ""}
        ${item.tags && item.tags.length !== 0 ? `<div class="tagContainer">${item.tags.map(tag => {return `<div class="tag">${tag}</div>`}).join("")}</div>` : ""}
        ${item.tags && item.tags.length !== 0 ? `<hr />` : ""}
        ${gunHasArt5Key.length !== 0 ? `<div class="tagContainer">${gunHasArt5Key.map(art5 => {return `<div class="tag">${getTranslation(art5, language, collection)}</div>`}).join("")}</div>` : ""}
        <table>
            <tbody>
                ${Object.entries(item).map(entry =>{
                    return excludedKeys.includes(entry[0]) ? null :
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
            </tbody>
        </table>
        ${item.remarks && item.remarks.length !== 0 ? `<div class="remarkContainer"><div class="remarkContainerTitle"><strong>${gunRemarks[language]}</strong></div><div class="remarkContainerContent">${item.remarks}</div></div>`: ""}
      </div>
        
     </body>
     <div class="footer">${item.manufacturer ? item.manufacturer : ""} ${"model" in item ? item.model : item.designation}: ${pdfFooter[language]}, ${generatedDate}</div>
      <style>
      @page {
        size: A4;
        margin: ${pdfCommonStyles.allPageMargin};
      }
      body{
        display: flex;
        justify-content: center;
        align-items: flex-start;
        align-content: flex-start;
        margin: 0;
        padding: 0;
        font-family: "Helvetica";
      }
      h1{
        position: relative;
        width: 100%;
        text-align: left;
        margin: 0;
        padding: 0;
        font-size: ${pdfCommonStyles.allTitleFontSize};
      }
      hr{
        width: 100%;
      }
      .bodyContent{
        width: 100%;
        padding: 0;
        box-sizing: border-box;
      }
      .imageContainer {
        position: relative;
            width: 100%;
            aspect-ratio: 30/10;
            display: flex;
            gap: ${pdfCommonStyles.imageGap};
            justify-content: center;
            align-items: center;
            flex-wrap: nowrap;
            margin: 10px 0;
            box-shadow: 0px 2px 5px -2px black;
            padding: 5px;
      }
      .imageDiv {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .image {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
    .tagContainer{
        position: relative;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start; 
        flex-wrap: wrap;
        gap: ${pdfCommonStyles.tagContainerGap};
    }
        .tag{
            position: relative;
            border: 1px solid black;
            padding: ${pdfCommonStyles.tagPadding};
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: ${pdfCommonStyles.tagFontSize};
        }
    table {
        position: relative;
        margin: ${pdfCommonStyles.tableVerticalMargin} 0;
        width: 100%;
        font-size: ${pdfCommonStyles.allTableFontSize};
        border-collapse: collapse;
    }
    table > tbody > tr {
        padding: ${pdfCommonStyles.tableRowVerticalPadding} 0;
    }
    table > tbody > tr:nth-child(even){
        background-color: #f5f5f5;
    }
    table > tbody > tr > td {
        padding: ${pdfCommonStyles.tableCellPadding};
        
    }
    .remarkContainer{
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;
    }
    .remarkContainerTitle{
        position: relative;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .remarkContainerContent{
        position: relative;
        width: 100%;
        white-space: pre-wrap;
    }
    .footer{
      position: fixed;
      bottom: 0;
      width: ${pdfCommonStyles.footerWidth};
      font-size: ${pdfCommonStyles.footerFontSize};
      border-top: ${pdfCommonStyles.footerTopBorder};
      padding-top: ${pdfCommonStyles.footerPaddingTop};
      margin-top: ${pdfCommonStyles.footerMarginTop};
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: center;
  }
      </style>
    </html>
    `;

    if (Platform.OS === 'ios') {
      const file = await Print.printToFileAsync({
        html: html,
        height:842, 
        width:595, 
        margins: {top: pdfCommonStyles.allPageMarginIOS, right: pdfCommonStyles.allPageMarginIOS, bottom: pdfCommonStyles.allPageMarginIOS, left: pdfCommonStyles.allPageMarginIOS},
        base64: true
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
    }   
      
}

export async function printGunCollection(language: string, shortCaliber: boolean, caliberDisplayNameList: {name:string, displayName?:string}[]){
console.log("HELLO THIS IS GUN COLLECTION")

const gunCollection = db.select().from(schema.gunCollection).all()
const guns = gunCollection.sort((a, b) =>{
  const x = a.manufacturer
  const y = b.manufacturer
  return x > y ? 1 : x < y ? -1 : 0
})

  const date:Date = new Date()
  const dateOptions:Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: "2-digit",
      minute: "2-digit"
    };
  const generatedDate:string = date.toLocaleDateString(dateLocales[language], dateOptions)
  const excludedKeys = ["images", "createdAt", "lastModifiedAt", "status", "id", "tags", "remarks", "manufacturingDate", "originCountry", "paidPrice", "shotCount", "mainColor", "lastCleanedAt", "lastCleanedAt_unix", "cleanInterval", "lastShotAt", "lastShotAt_unix", "marketValue", "boughtFrom"];
  const html = `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    </head>
    <body>
    <div class="bodyContent">
      <h1>${pdfTitle[language]}</h1>
        <table>
        <thead>
          <tr>
          ${gunDataTemplate.map(data=>{return excludedKeys.includes(data.name) ? null : `<th>${data[language]}</th>`}).join("")}
          </tr>
        </thead>
          <tbody>
              ${guns.map(gun =>{
                return `<tr>${gunDataTemplate.map(data=>{return data.name in gun && !excludedKeys.includes(data.name) ? `<td>${data.name === "caliber" ? getShortCaliberNameFromArray(gun[data.name], caliberDisplayNameList, shortCaliber).join(",<br>") : datePickerTriggerFields.includes(data.name) ? parseDate(gun[data.name]) : gun[data.name] ? gun[data.name] : ""}</td>` : !(data.name in gun) && !excludedKeys.includes(data.name) ? `<td></td>`: ""}).join("")}</tr>`}).join("")}
          </tbody>
      </table>
    </div>
      
   </body>
   <div class="footer">${pdfFooter[language]}, ${generatedDate}</div>
   <style>
   @page {
     size: A4 landscape;
     margin:${pdfCommonStyles.allPageMargin};
   }
   body{
     display: flex;
     justify-content: center;
     align-items: flex-start;
     align-content: flex-start;
     margin: 0;
     padding: 0;
     font-family: "Helvetica";
   }
   h1{
     position: relative;
     width: 100%;
     text-align: left;
     margin: 0;
     padding: 0;
     font-size: ${pdfCommonStyles.allTitleFontSize};
   }
   .legend{
     width: 100%;
     text-align: left;
     font-size: ${pdfCommonStyles.allSubtitleFontSize};
   }
   .bodyContent{
     width: 100%;
     padding: 0;
     box-sizing: border-box;
   }
 table {
     position: relative;
     margin: ${pdfCommonStyles.tableVerticalMargin} 0;
     width: 100%;
     font-size: ${pdfCommonStyles.allTableFontSize};
     border-collapse: collapse;
 }

 tr {
   position: relative;
     padding: ${pdfCommonStyles.tableRowVerticalPadding} 0;
     width: 100%;
 }
 tr:nth-child(even){
     background-color: #f5f5f5;
 }
 td {
     padding: ${pdfCommonStyles.tableCellPadding};
     vertical-align: top;
 }
 th{
   text-align: left;
   padding: ${pdfCommonStyles.tableCellPadding};
 }
 th, td{
   border: 1px solid #ddd;
 }
 .hidden{
   color: transparent;
 }
 .footer{
     position: fixed;
     bottom: 0;
     width: ${pdfCommonStyles.footerWidth};
     font-size: ${pdfCommonStyles.footerFontSize};
     border-top: ${pdfCommonStyles.footerTopBorder};
     padding-top: ${pdfCommonStyles.footerPaddingTop};
     margin-top: ${pdfCommonStyles.footerMarginTop};
     display: flex;
     justify-content: center;
     align-items: center;
     align-content: center;
 }
   </style>
  </html>
  `;

  console.log("finished HTML")
  console.log("begin printing gun collection")
       
  if (Platform.OS === 'ios') {
    const file = await Print.printToFileAsync({
      html: html,
      height:595, 
      width:842, 
      margins: {top: pdfCommonStyles.allPageMarginIOS, right: pdfCommonStyles.allPageMarginIOS, bottom: pdfCommonStyles.allPageMarginIOS, left: pdfCommonStyles.allPageMarginIOS},
      base64: true
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
  }    
}

export async function printGunCollectionArt5(language: string, shortCaliber: boolean, caliberDisplayNameList: {name:string, displayName?:string}[]){
console.log("HELLO THIS IS GUN COLLECTION ART 5")

const gunCollection = db.select().from(schema.gunCollection).all()
const gunHasArt5Key = gunCollection.filter(gun => {return art5Keys.some(art5 => gun[art5] === true)})

const guns = gunHasArt5Key.sort((a, b) =>{
  const x = a.manufacturer
  const y = b.manufacturer
  return x > y ? 1 : x < y ? -1 : 0
})

  const date:Date = new Date()
  const dateOptions:Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: "2-digit",
      minute: "2-digit"
    };
  const generatedDate:string = date.toLocaleDateString(dateLocales[language], dateOptions)
  const excludedKeys = ["db_id", "images", "createdAt", "lastModifiedAt", "status", "id", "tags", "remarks", "manufacturingDate", "originCountry", "paidPrice", "shotCount", "mainColor", "lastCleanedAt", "lastCleanedAt_unix", "cleanInterval", "lastShotAt", "lastShotAt_unix", "marketValue", "boughtFrom"];
  const html = `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    </head>
    <body>
    <div class="bodyContent">
      <h1>${pdfTitleArt5[language]}</h1>
      <p class="legend">${checkBoxes.map((box, index) => `${index+1}: ${box[language]}`).join(", ")}<p>
        <table>
        <thead>
          <tr>
          ${gunDataTemplate.map(data=>{return excludedKeys.includes(data.name) ? null : `<th>${data[language]}</th>`}).join("")}${checkBoxes.map((box, index) => `<th>${index+1}</th>`).join("")}
          </tr>
        </thead>
          <tbody>
            ${guns.map(gun =>{
              return `
              <tr>${gunDataTemplate.map(data=> {
                return data.name in gun && !excludedKeys.includes(data.name) ? 
                  `<td>${data.name === "caliber" ? getShortCaliberNameFromArray(gun[data.name], caliberDisplayNameList, shortCaliber).join(",<br>") : datePickerTriggerFields.includes(data.name) ? parseDate(gun[data.name]) : gun[data.name] ? gun[data.name] : ""}</td>` 
                : !(data.name in gun) && !excludedKeys.includes(data.name) ? 
                  `<td></td>`
                : null}).join("")}${checkBoxes.map(box => {
                  return gun[box.name] === true ? 
                    `<td class="xcell">X</td>` 
                  : `<td class="hidden"> </td>`}).join("")}
              </tr>`
            }).join("")}
          </tbody>
      </table>
    </div>
      
   </body>
   <div class="footer">${pdfFooter[language]}, ${generatedDate}</div>
   <style>
   @page {
     size: A4 landscape;
     margin:${pdfCommonStyles.allPageMargin};
   }
   body{
     display: flex;
     justify-content: center;
     align-items: flex-start;
     align-content: flex-start;
     margin: 0;
     padding: 0;
     font-family: "Helvetica";
   }
   h1{
     position: relative;
     width: 100%;
     text-align: left;
     margin: 0;
     padding: 0;
     font-size: ${pdfCommonStyles.allTitleFontSize};
   }
   .legend{
     width: 100%;
     text-align: left;
     font-size: ${pdfCommonStyles.allSubtitleFontSize};
   }
   .bodyContent{
     width: 100%;
     padding: 0;
     box-sizing: border-box;
   }
 table {
     position: relative;
     margin: ${pdfCommonStyles.tableVerticalMargin} 0;
     width: 100%;
     font-size: ${pdfCommonStyles.allTableFontSize};
     border-collapse: collapse;
 }

 tr {
   position: relative;
     padding: ${pdfCommonStyles.tableRowVerticalPadding} 0;
     width: 100%;
 }
 tr:nth-child(even){
     background-color: #f5f5f5;
 }
 td {
     padding: ${pdfCommonStyles.tableCellPadding};
     vertical-align: top;
 }
 th{
   text-align: left;
   padding: ${pdfCommonStyles.tableCellPadding};
 }
 th, td{
   border: 1px solid #ddd;
 }
 .xcell{
  align: center;
 }
 .hidden{
   color: transparent;
 }
 .footer{
     position: fixed;
     bottom: 0;
     width: ${pdfCommonStyles.footerWidth};
     font-size: ${pdfCommonStyles.footerFontSize};
     border-top: ${pdfCommonStyles.footerTopBorder};
     padding-top: ${pdfCommonStyles.footerPaddingTop};
     margin-top: ${pdfCommonStyles.footerMarginTop};
     display: flex;
     justify-content: center;
     align-items: center;
     align-content: center;
 }
   </style>
  </html>
  `;
  console.log("finished HTML")
  console.log("begin printing gun collection")
  if (Platform.OS === 'ios') {
    const file = await Print.printToFileAsync({
      html: html,
      height:595, 
      width:842, 
      margins: {top: pdfCommonStyles.allPageMarginIOS, right: pdfCommonStyles.allPageMarginIOS, bottom: pdfCommonStyles.allPageMarginIOS, left: pdfCommonStyles.allPageMarginIOS},
      base64: true
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
  }   
}

export async function printAmmoCollection(ammunition:AmmoType[], language: string, shortCaliber: boolean, caliberDisplayNameList: {name:string, displayName?:string}[]){
console.log("HELLO THIS IS AMMO COLLECTION")
  const date:Date = new Date()
  const dateOptions:Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: "2-digit",
      minute: "2-digit"
    };
  const generatedDate:string = date.toLocaleDateString(dateLocales[language], dateOptions)
  const excludedKeys = ["images", "createdAt", "lastModifiedAt", "lastTopUpAt", "id", "tags", "remarks", "manufacturingDate", "originCountry", "currentStock", "criticalStock", "previousStock"];
  const html = `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    </head>
    <body>
    <div class="bodyContent">
      <h1>${pdfTitleAmmo[language]}</h1>
        <table>
        <thead>
          <tr>
          ${ammoDataTemplate.map(data=>{return excludedKeys.includes(data.name) ? null : `<th>${data[language]}</th>`}).join("")}
          </tr>
        </thead>
          <tbody>
              ${ammunition.map(ammo =>{
                return `<tr>${ammoDataTemplate.map(data=>{return data.name in ammo && !excludedKeys.includes(data.name) ? `<td>${data.name === "caliber" ? getShortCaliberNameFromArray(ammo[data.name], caliberDisplayNameList, shortCaliber) : ammo[data.name]}` : !(data.name in ammo) && !excludedKeys.includes(data.name) ? `<td></td>`: null}).join("")}</tr>`}).join("")}
          </tbody>
      </table>
    </div>
      
   </body>
   <div class="footer">${pdfFooter[language]}, ${generatedDate}</div>
   <style>
   @page {
     size: A4 landscape;
     margin:${pdfCommonStyles.allPageMargin};
   }
   body{
     display: flex;
     justify-content: center;
     align-items: flex-start;
     align-content: flex-start;
     margin: 0;
     padding: 0;
     font-family: "Helvetica";
   }
   h1{
     position: relative;
     width: 100%;
     text-align: left;
     margin: 0;
     padding: 0;
     font-size: ${pdfCommonStyles.allTitleFontSize};
   }
   .legend{
     width: 100%;
     text-align: left;
     font-size: ${pdfCommonStyles.allSubtitleFontSize};
   }
   .bodyContent{
     width: 100%;
     padding: 0;
     box-sizing: border-box;
   }
 table {
     position: relative;
     margin: ${pdfCommonStyles.tableVerticalMargin} 0;
     width: 100%;
     font-size: ${pdfCommonStyles.allTableFontSize};
     border-collapse: collapse;
 }

 tr {
   position: relative;
     padding: ${pdfCommonStyles.tableRowVerticalPadding} 0;
     width: 100%;
 }
 tr:nth-child(even){
     background-color: #f5f5f5;
 }
 td {
     padding: ${pdfCommonStyles.tableCellPadding};
     vertical-align: top;
 }
 th{
   text-align: left;
   padding: ${pdfCommonStyles.tableCellPadding};
 }
 th, td{
   border: 1px solid #ddd;
 }
 .hidden{
   color: transparent;
 }
 .footer{
     position: fixed;
     bottom: 0;
     width: ${pdfCommonStyles.footerWidth};
     font-size: ${pdfCommonStyles.footerFontSize};
     border-top: ${pdfCommonStyles.footerTopBorder};
     padding-top: ${pdfCommonStyles.footerPaddingTop};
     margin-top: ${pdfCommonStyles.footerMarginTop};
     display: flex;
     justify-content: center;
     align-items: center;
     align-content: center;
 }
   </style>
  </html>
  `;

  console.log("finished HTML")
      
      if (Platform.OS === 'ios') {
        const file = await Print.printToFileAsync({
          html: html,
          height:595, 
          width:842, 
          margins: {top: pdfCommonStyles.allPageMarginIOS, right: pdfCommonStyles.allPageMarginIOS, bottom: pdfCommonStyles.allPageMarginIOS, left: pdfCommonStyles.allPageMarginIOS},
          base64: true
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