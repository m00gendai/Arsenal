import type { Language, ReviewTranslation } from "../types/types_global"
import s from "../styles/reviews.module.css"
import Review from "./Review"

interface Props{
    reviewTranslations: any
    language: Language
}

export default function Reviews({ reviewTranslations, language}: Props){
    console.log(reviewTranslations)
    return(
        <div className={s.wrapper}>
            <div className={s.overlay}></div>
        <div className={s.container}>
            <div className={s.inner}>
            {reviewTranslations.map((review, index) =>{
                return(
                    <Review review={review} language={language}/>
                )
            })}
            
            </div>
            
        </div>
        </div>
    )
}