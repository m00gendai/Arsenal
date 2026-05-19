import React from "react";
import { section_collectionItems_accessories, section_collectionItems_literature, section_collectionItems_main, section_collectionItems_parts, section_collectionItems_reloading, section_collectionItems_title } from "../../text/text_details";
import type { Language } from "../../types/types_global";
import s from "../../styles/supportedCollections.module.css"
import t from "../../styles/accordion.module.css"

interface Props{
    language: Language
}

export default function Details_supportedCollections({language}:Props){

    const collections = [
        section_collectionItems_main, 
        section_collectionItems_accessories, 
        section_collectionItems_parts, 
        section_collectionItems_literature,
        section_collectionItems_reloading
    ]

   function getIcon(title: { name: string }){
        if(title?.name){
            switch(title.name){
                case "gunCollection":
                    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pistol</title><path d="M7,5H23V9H22V10H16A1,1 0 0,0 15,11V12A2,2 0 0,1 13,14H9.62C9.24,14 8.89,14.22 8.72,14.56L6.27,19.45C6.1,19.79 5.76,20 5.38,20H2C2,20 -1,20 3,14C3,14 6,10 2,10V5H3L3.5,4H6.5L7,5M14,12V11A1,1 0 0,0 13,10H12C12,10 11,11 12,12A2,2 0 0,1 10,10A1,1 0 0,0 9,11V12A1,1 0 0,0 10,13H13A1,1 0 0,0 14,12Z" /></svg>
                case "ammoCollection":
                    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>ammunition</title><path d="M14,22H10V21H14V22M13,10V7H11V10L10,11.5V20H14V11.5L13,10M12,2C12,2 11,3 11,5V6H13V5C13,5 13,3 12,2M8,22H4V21H8V22M7,10V7H5V10L4,11.5V20H8V11.5L7,10M6,2C6,2 5,3 5,5V6H7V5C7,5 7,3 6,2M20,22H16V21H20V22M19,10V7H17V10L16,11.5V20H20V11.5L19,10M18,2C18,2 17,3 17,5V6H19V5C19,5 19,3 18,2Z" /></svg>
                case "opticCollection":
                    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>toslink</title><path d="M20 10V7L17 4H7L4 7V10C2.9 10 2 10.9 2 12S2.9 14 4 14V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V14C21.11 14 22 13.11 22 12S21.11 10 20 10M12 16C9.79 16 8 14.21 8 12S9.79 8 12 8 16 9.79 16 12 14.21 16 12 16M14 12C14 13.11 13.11 14 12 14S10 13.11 10 12 10.9 10 12 10 14 10.9 14 12Z" /></svg>
                case "scopeCollection":
                    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>crosshairs</title><path d="M3.05,13H1V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1H13V3.05C17.17,3.5 20.5,6.83 20.95,11H23V13H20.95C20.5,17.17 17.17,20.5 13,20.95V23H11V20.95C6.83,20.5 3.5,17.17 3.05,13M12,5A7,7 0 0,0 5,12A7,7 0 0,0 12,19A7,7 0 0,0 19,12A7,7 0 0,0 12,5Z" /></svg>
                case "magazineCollection":
                    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>magazine-pistol</title><path d="M14 1L12 3H7L9 21H8V23H18V21L16 1M9 5H12L12.24 7H9.24M9.47 9H12.47L12.71 11H9.71M9.94 13H12.94L13.18 15H10.18M10.41 17H13.41L13.65 19H10.65Z" /></svg>
                case "silencerCollection":
                    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>volume-mute</title><path d="M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z" /></svg>
                case "lightLaserCollection":
                    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>spotlight-beam</title><path d="M9,16.5L9.91,15.59L15.13,20.8L14.21,21.71L9,16.5M15.5,10L16.41,9.09L21.63,14.3L20.71,15.21L15.5,10M6.72,2.72L10.15,6.15L6.15,10.15L2.72,6.72C1.94,5.94 1.94,4.67 2.72,3.89L3.89,2.72C4.67,1.94 5.94,1.94 6.72,2.72M14.57,7.5L15.28,8.21L8.21,15.28L7.5,14.57L6.64,11.07L11.07,6.64L14.57,7.5Z" /></svg>
                case "conversionCollection":
                    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>cog-transfer-outline</title><path d="M15 17V14H18V12L22 15.5L18 19V17H15M17 18V21H14V23L10 19.5L14 16V18H17M12 8C9.79 8 8 9.8 8 12C8 13.91 9.35 15.54 11.21 15.92L16 11.86C15.93 9.71 14.16 8 12 8M12 14C10.9 14 10 13.11 10 12S10.9 10 12 10 14 10.9 14 12 13.11 14 12 14M21.66 8.73L19.66 5.27C19.54 5.05 19.28 4.96 19.05 5.05L16.56 6.05C16.05 5.64 15.5 5.31 14.87 5.05L14.5 2.42C14.46 2.18 14.25 2 14 2H10C9.75 2 9.54 2.18 9.5 2.42L9.13 5.07C8.5 5.33 7.96 5.66 7.44 6.07L5 5.05C4.77 4.96 4.5 5.05 4.39 5.27L2.39 8.73C2.26 8.94 2.31 9.22 2.5 9.37L4.57 11L4.5 12L4.57 13L2.46 14.63C2.26 14.78 2.21 15.06 2.34 15.27L4.34 18.73C4.45 19 4.74 19.11 5 19L5 19L7.5 18C7.74 18.19 8 18.37 8.26 18.53L9.91 17.13C9.14 16.8 8.46 16.31 7.91 15.68L5.5 16.68L4.73 15.38L6.8 13.8C6.4 12.63 6.4 11.37 6.8 10.2L4.69 8.65L5.44 7.35L7.85 8.35C8.63 7.45 9.68 6.82 10.85 6.57L11.25 4H12.75L13.12 6.62C14.29 6.86 15.34 7.5 16.12 8.39L18.53 7.39L19.28 8.69L17.2 10.2C17.29 10.46 17.36 10.73 17.4 11H19.4L21.5 9.37C21.72 9.23 21.78 8.95 21.66 8.73M12 8C9.79 8 8 9.8 8 12C8 13.91 9.35 15.54 11.21 15.92L16 11.86C15.93 9.71 14.16 8 12 8M12 14C10.9 14 10 13.11 10 12S10.9 10 12 10 14 10.9 14 12 13.11 14 12 14M12 8C9.79 8 8 9.8 8 12C8 13.91 9.35 15.54 11.21 15.92L16 11.86C15.93 9.71 14.16 8 12 8M12 14C10.9 14 10 13.11 10 12S10.9 10 12 10 14 10.9 14 12 13.11 14 12 14Z" /></svg>
                case "barrelCollection":
                    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>lightbulb-fluorescent-tube-outline</title><path d="M7.05 2.81L6.5 3.34L5.11 1.92L3.87 3.16L5.28 4.58L4.58 5.28L3.16 3.87L1.92 5.11L3.34 6.5L2.81 7.05L4.22 8.46L15.54 19.78L16.95 21.19L17.5 20.66L18.89 22.08L20.13 20.84L18.72 19.43L19.43 18.72L20.84 20.13L22.08 18.89L20.66 17.5L21.19 16.95L19.78 15.54L8.46 4.22M7.05 5.64L18.36 16.95L16.95 18.36L5.64 7.05Z" /></svg>
                case "miscAccessoryCollection":
                    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>help-circle-outline</title><path d="M11,18H13V16H11V18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z" /></svg>
                case "bookCollection":
                    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>bookshelf</title><path d="M9 3V18H12V3H9M12 5L16 18L19 17L15 4L12 5M5 5V18H8V5H5M3 19V21H21V19H3Z" /></svg>
                case "dieCollection":
                    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>lightbulb-cfl-spiral</title><path d="M11 2C10.84 2 10.69 2.03 10.55 2.1L8.55 3.1C7.56 3.66 8 5 9 5C9.16 5 9.32 4.95 9.45 4.9L11.45 3.9C12.43 3.36 12 2 11 2M15 4C14.83 4 14.69 4.03 14.55 4.1L8.55 7.1C7.56 7.68 8 9 9 9C9.18 9 9.32 8.95 9.45 8.9L15.45 5.9C16.41 5.43 16 4 15 4M15 8C14.84 8 14.69 8.03 14.55 8.1L8.7 11.03C8.2 11.25 8 11.6 8 12V14H7V17C7 17.55 7.44 18 8 18H16C16.55 18 17 17.55 17 17V14H16V13C16 12.44 15.55 12 15 12C14.45 12 14 12.45 14 13V14H10V12.62L15.45 9.9C16.42 9.34 16 8 15 8M9 20V21C9 21.57 9.46 22 10 22H14C14.56 22 15 21.55 15 21V20" /></svg>
                default: 
                    return ""
            }
        }
        return ""
    }

    return (
        <>
            <h2 id="supportedCollections" >{section_collectionItems_title.title[language]}</h2>
            <p dangerouslySetInnerHTML={{__html: section_collectionItems_title.text[language]}}></p>
            {collections.map((collection, index) => {
                const collectionTitles = collection.text[language].filter(entry => typeof entry !== "object" && entry !== null && !Array.isArray(entry)) as string[]
                const collectionContent = collection.text[language].filter(entry => Array.isArray(entry)) as string[][]
                const collectionName = collection.text[language].filter(entry => typeof entry === "object" && entry !== null && !Array.isArray(entry)) as {name: string}[]
                
                return (
                    <React.Fragment key={`collection_${index}`}>
                        <h3 className={s.collection}>{collection.title[language]}</h3>
                        <div className={s.container}>
                            {Array.from(new Array(collectionTitles.length)).map((entry, indx) => {
                                return (
                                    <details className={t.details} key={`entry_${index}`}>
                                        <summary className={t.summary}>
                                            <div className={s.title}>
                                                <div className={s.title_content}>
                                                    {getIcon(collectionName[indx])}
                                                    <p>{`${collectionTitles[indx]}`}</p>
                                                </div>
                                            </div>   
                                        </summary>
                                        <div className={t.content}>
                                            <ul className={s.list}>
                                                {collectionContent[indx] && collectionContent[indx].map((entry, ind) => {
                                                    return <li key={`accordion_listItem_${ind}`} dangerouslySetInnerHTML={{__html: entry}}></li>
                                                })}
                                            </ul>
                                        </div>
                                    </details>

                                )
                            })}
                        </div>
                    </React.Fragment>
                )
            })}
        </>
    )
}