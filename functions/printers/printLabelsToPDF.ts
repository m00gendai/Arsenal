import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as IntentLauncher from 'expo-intent-launcher';
import * as FileSystem from 'expo-file-system/legacy';
import { dateLocales, defaultViewPadding, pdfCommonStyles, pdfDateOptions } from 'configs/configs';
import { Platform } from 'react-native';
import { LabelTemplate } from 'lib/shippingLables';
import { PreferredUnits, SorterSettings } from 'stores/usePreferenceStore';
import { db } from 'db/client';
import * as schema from "db/schema"
import { CollectionType } from 'lib/interfaces';
import { inArray } from "drizzle-orm";
import QRCodeSVG from "qrcode-svg";
import { dataTemplate_Translations } from 'lib/DataTemplates/translations';
import { determineSortingFunction } from 'functions/determinators';

export async function printLabelsToPDF(
  language: string, 
  shortCaliber: boolean, 
  caliberDisplayNameList: {name:string, displayName?:string}[], 
  preferredUnits: PreferredUnits,
  label: LabelTemplate,
  qrCodeEnabled: boolean,
  textEnabled: boolean,
  fontSize: number,
  selectedItems: string[],
  collection: CollectionType,
  qrCodeWidthHeight: {height: number; width: number;},
  sortBy: SorterSettings
){
try{
  const items = await db.select().from(schema[collection]).where(inArray(schema[collection].id, selectedItems)).orderBy(determineSortingFunction(collection, sortBy))

  // 1. Calculate labels per page
const labelsPerPage = label.columns * label.rows;

// 2. Chunk the items into pages
const pages = [];
for (let i = 0; i < items.length; i += labelsPerPage) {
  pages.push(items.slice(i, i + labelsPerPage));
}

// 3. Generate HTML for each page
const pagesHtml = pages.map((pageItems) => {
  const labelsMarkup = pageItems.map((item) => {
    let qrSvg = "";
    if (qrCodeEnabled) {
      const qr = new QRCodeSVG({
        content: `${item.id}`,
        padding: 0,
        ecl: "H",
        container: "svg-viewbox"
      });
      qrSvg = qr.svg();
    }

    return `
      <div class="label">
        ${qrCodeEnabled ? `<div class="qr">${qrSvg}</div>` : ""}
        ${textEnabled ? `
          <div class="text">
            <p>${dataTemplate_Translations.manufacturer[language]}:</p>
            <p><strong>${item.manufacturer ?? ""}</strong></p>
            <p>${dataTemplate_Translations.model[language]}:</p>
            <p><strong>${item.model ?? ""}</strong></p>
            <p>${dataTemplate_Translations.serial[language]}:</p>
            <p><strong>${item.serial ?? ""}</strong></p>
          </div>` : ""}
      </div>`;
  }).join("");

  return `<div class="container">${labelsMarkup}</div>`;
}).join("");

  const html = `
    <html>
    <head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
      <body>
        ${pagesHtml}
      </body>

      <style>
      @page {
  size:  ${label.pageWidth}mm ${label.pageHeight}mm;
  margin: 0;
}
body{
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
        }
        
        .container{
          width: ${label.pageWidth}mm;
          height: ${label.pageHeight}mm;
          padding-left: ${label.marginLeft}mm;
          padding-top: ${label.marginTop}mm;
          display: grid;
  grid-template-columns: repeat(${label.columns}, ${label.labelWidth}mm);
  grid-auto-rows: ${label.labelHeight}mm;

  column-gap: ${label.horizontalPitch - label.labelWidth}mm;
  row-gap: ${label.verticalPitch - label.labelHeight}mm;
          page-break-after: always;
          break-after: page;
          box-sizing: border-box;
        }

.label {
  width: ${label.labelWidth}mm;
  height: ${label.labelHeight}mm;
  display: flex;
  border: 1px solid black;
  box-sizing: border-box;
  flex-direction: row; 
  align-items: center;
  justify-content: flex-start;
  page-break-inside: avoid;
  break-inside: avoid;
  border-radius: ${label.radius}%;
}

.qr {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2mm;
  height: calc(${label.radius === 100 ? "70.71% - 4mm" : "100% - 4mm"});
}

.qr svg {
  width: 100%;  
  height: 100%; 
  display: block;
}

.text {
padding: 2mm;
  flex: 2;
  flex-shrink: 1;
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  height: calc(100% - 4mm);
}

.text p{
position: relative;
  width: 100%;
  font-size:${(25.4/96)*fontSize}mm;
  margin: 0;
}
      </style>
        
    </html>
  `
// 2.83465 is the conversion from points to mm

  if (Platform.OS === 'ios') {
    const file = await Print.printToFileAsync({
      html: html,
      height:label.pageHeight * 2.83465,
      width:label.pageWidth * 2.83465, 
      margins: { left: 0, top: 0, right: 0, bottom: 0 }
    })

    await shareAsync(file.uri)
  
  } else if(Platform.OS === "android"){
    const { uri } = await Print.printToFileAsync({html, height:label.pageHeight * 2.83465, width:label.pageWidth * 2.83465, margins: { left: 0, top: 0, right: 0, bottom: 0 }});
    const cUri = await FileSystem.getContentUriAsync(uri)
    
    await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
        data: cUri,
        flags: 1,
        type: 'application/pdf'
    })
  }
}catch(e){ 
    console.error(e)
  }
}

