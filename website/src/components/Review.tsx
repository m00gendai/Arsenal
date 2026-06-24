import type { Language } from "../types/types_global"
import s from "../styles/review.module.css"

interface Props{
    review: any
    language: Language
}

export default function Review({review, language}:Props){
    console.log(language)
    return(
        <div className={s.container}>
            <div className={s.main}>
            <p className={s.title}>{review.title[language]}</p>
            <p className={s.text}>{review.body[language]}</p>
            </div>
            {language !== review.originalLanguage ? <div className={s.translated}><p>{`Translated from `}</p><div className={s.flag} id={s.flag_de} aria-label="Deutsch"></div></div> : null}
        </div>
    )
}