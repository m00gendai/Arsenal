import gunCollection from "../assets/collections/gunCollection.jpg"
import partsCollection from "../assets/collections/partsCollection.jpg"
import { metadata_featureImageAlt } from "../text/text_metadata"
import type { Language } from "../types/types_global"
import s from "../styles/salesPitchImage.module.css"

interface Props{
    collection: string
}

export default function SalesPitchImage({collection}:Props){

    function getImage(collection: string){
        switch(collection){
            case "gunCollection":
                return gunCollection.src
            case "partsCollection":
                return partsCollection.src
            default: 
                return ""
        }
    }

    return (
        <div className={s.wrapper}>
            <img src={getImage(collection)} alt={""} className={s.image}/>
        </div>
    )
}