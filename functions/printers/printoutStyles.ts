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
    }
    .hidden{
        color: transparent;
    }
`