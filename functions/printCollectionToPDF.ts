import { generatePDF } from 'react-native-html-to-pdf';
import * as FileSystem from "expo-file-system";
import { Platform } from 'react-native';
import { shareAsync } from 'expo-sharing';
import { CommonStyles } from '../interfaces';
import { db } from '../db/client';
import * as schema from "../db/schema"
import { dateLocales } from '../configs';
import { pdfFooter, pdfTitle } from '../lib/textTemplates';
import { gunDataTemplate } from '../lib/gunDataTemplate';

export default async function printCollectionToPDF(language:string){

    const commonStyles:CommonStyles={
      allPageMargin: "15mm",
      allPageMarginIOS: Math.ceil(15*2.83465),
      allTitleFontSize: "30px",
      allSubtitleFontSize: "12px",
      allTableFontSize: "15px",
      imageGap: "20px",
      tableVerticalMargin: "20px",
      tableRowVerticalPadding: "5px",
      tableCellPadding: "5px",
      footerWidth: "calc(100% - 30mm)",
      footerFontSize: "8px",
      footerTopBorder: "1px solid grey",
      footerPaddingTop: "5px",
      footerMarginTop: "5mm",
      tagPadding: "5px",
      tagFontSize: "10px",
      tagContainerGap: "10px"
    }

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
    const excludedKeys = ["images", "createdAt", "lastModifiedAt", "status", "id", "tags", "remarks", "manufacturingDate", "originCountry", "paidPrice", "shotCount", "mainColor", "lastCleanedAt", "cleanInterval", "lastShotAt", "marketValue", "boughtFrom"];
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
                  /*@ts-expect-error */
                  return `<tr>${gunDataTemplate.map(data=>{return data.name in gun && !excludedKeys.includes(data.name) ? `<td class=${data.name === "caliber" ? "whitespace" : ""}>${data.name === "caliber" ? getShortCaliberNameFromArray(gun[data.name], caliberDisplayNameList, shortCaliber).join(",\n") : gun[data.name]}</td>` : !(data.name in gun) && !excludedKeys.includes(data.name) ? `<td></td>`: null}).join("")}</tr>`}).join("")}
            </tbody>
        </table>
      </div>
        
     </body>
     <div class="footer">${pdfFooter[language]}, ${generatedDate}</div>
     <style>
     @page {
       size: A4 landscape;
       margin:${commonStyles.allPageMargin};
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
       font-size: ${commonStyles.allTitleFontSize};
     }
     .legend{
       width: 100%;
       text-align: left;
       font-size: ${commonStyles.allSubtitleFontSize};
     }
     .bodyContent{
       width: 100%;
       padding: 0;
       box-sizing: border-box;
     }
   table {
       position: relative;
       margin: ${commonStyles.tableVerticalMargin} 0;
       width: 100%;
       font-size: ${commonStyles.allTableFontSize};
       border-collapse: collapse;
   }
  
   tr {
     position: relative;
       padding: ${commonStyles.tableRowVerticalPadding} 0;
       width: 100%;
   }
   tr:nth-child(even){
       background-color: #f5f5f5;
   }
   td {
       padding: ${commonStyles.tableCellPadding};
       vertical-align: top;
   }
   th{
     text-align: left;
     padding: ${commonStyles.tableCellPadding};
   }
   th, td{
     border: 1px solid #ddd;
   }
   .hidden{
     color: transparent;
   }
   .whitespace{
     white-space: pre-wrap;
   }
   .footer{
       position: fixed;
       bottom: 0;
       width: ${commonStyles.footerWidth};
       font-size: ${commonStyles.footerFontSize};
       border-top: ${commonStyles.footerTopBorder};
       padding-top: ${commonStyles.footerPaddingTop};
       margin-top: ${commonStyles.footerMarginTop};
       display: flex;
       justify-content: center;
       align-items: center;
       align-content: center;
   }
     </style>
    </html>
    `;

    let options = {
      html: '<h1>PDF TEST</h1>',
      fileName: 'test',
      base64: true,
    };
if(Platform.OS === "ios"){
  let results = await generatePDF(options);
  await shareAsync(results.filePath)
  return
}
    let results = await generatePDF(options);
    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()
    
        if(permissions.granted){
            let directoryUri = permissions.directoryUri
            const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(directoryUri, `test.pdf`, "text/pdf")
            await FileSystem.writeAsStringAsync(fileUri, results.base64, {encoding: FileSystem.EncodingType.Base64})
        }

}