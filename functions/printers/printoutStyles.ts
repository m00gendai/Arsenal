import { pdfCommonStyles } from "configs/configs";

export const tableStyle: string = `
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
        page-break-inside: avoid !important;
        break-inside: avoid !important;
        page-break-after: auto;
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
        background-color: #000;
        color: #fff;
    }
    th, td{
        border: 1px solid #ddd;
    }
    thead tr:first-child th {
        font-size: ${pdfCommonStyles.allTitleFontSize};
        font-weight: bold;
        border: none;
        padding: 0;
        padding-bottom: 25px;
        background-color: transparent;
        color: #000;
    }
    tfoot > tr > td{
        text-align: center;
        border: none;
        padding: 10px;
        font-style: italic;
    }
    .hidden{
        color: transparent;
    }
    @media print {
        * {
            -webkit-print-color-adjust: exact !important;
        }
        
        tr {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
        }
        thead {
            display: table-header-group !important;
        }
        
        tfoot {
            display: table-footer-group !important;
        }
    }
`

export const galleryStyle: string = `
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
    tfoot > tr > td{
        text-align: center;
        border: none;
        border-top: 1px solid #000;
        padding: 10px;
        margin-top: 20px;
        font-style: italic;
    }

    @media print {
        * {
            -webkit-print-color-adjust: exact !important;
        }
        tr {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
        }
        thead {
            display: table-header-group !important;
        }

        tfoot {
            display: table-footer-group !important;
        }
    }
}
`