import { faq } from "../../text/text_faq"
import type { Language } from "../../types/types_global"
import s from "../../styles/supportedCollections.module.css"
import t from "../../styles/accordion.module.css"

interface Props{
    language: Language
}

export default function Faq_accordions({language}:Props){
    return(
        <div className={s.container}>
            {faq.map((entry, index) => {
                return(
                    <details className={t.details} key={`entry_${index}`}>
                        <summary className={t.summary}>
                             <div className={s.title}>
                                <div className={s.title_content}>
                                    <svg className={t.detailsClosed} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-down-circle-outline</title><path d="M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M6,10L12,16L18,10L16.6,8.6L12,13.2L7.4,8.6L6,10Z" /></svg>
                                    <svg className={t.detailsOpen} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-up-circle-outline</title><path d="M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M7.4,15.4L12,10.8L16.6,15.4L18,14L12,8L6,14L7.4,15.4Z" /></svg>
                                    <p>{entry.question[language]}</p>
                                </div>
                            </div>
                        </summary>
                        <div className={t.content}>
                            {entry.answer[language].map((answer, indx) => {
                                if(Array.isArray(answer)){
                                    return(
                                        <ul className={t.list} key={`faq_ul_${indx}`}>
                                            {answer.map((listItem, idx) => {
                                                return <li key={`faq_listItem_${idx}`} dangerouslySetInnerHTML={{__html: listItem}}></li>
                                            })}
                                        </ul>
                                    )
                                } else {
                                    return <p className={t.text} key={`faq_answer_${indx}`} dangerouslySetInnerHTML={{__html: answer}}></p>
                                }                   
                            })}
                        </div>
                    </details>
                )
            })} 
        </div>
    )
}