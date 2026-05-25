import FeatureImage_de from "../assets/feature_de_mask.png"
import FeatureImage_en from "../assets/feature_en_mask.png"
import FeatureImage_fr from "../assets/feature_fr_mask.png"
import FeatureImage_it from "../assets/feature_it_mask.png"
import { metadata_featureImageAlt } from "../text/text_metadata"
import type { Language } from "../types/types_global"
import s from "../styles/featureImage.module.css"
import pattern from "../assets/pattern.jpg"

interface Props{
    language: Language
}

export default function FeatureImage({language}:Props){

    function getFeatureImage(lang: Language){
        switch(lang){
            case "de":
                return FeatureImage_de
            case "en":
                return FeatureImage_en
            case "fr":
                return FeatureImage_fr
            case "it":
                return FeatureImage_it
            default: 
                return FeatureImage_en
        }
    }

    return (
        <section className={`content fullWidth noPadding ${s.section}`} style={{
            backgroundImage: `url("${pattern.src}")`,
            backgroundRepeat: "repeat",
            backgroundSize: "contain",
        }}>
            <div className={s.wrapper}>
                <img fetchPriority="high" src={getFeatureImage(language).src} width={getFeatureImage(language).width} height={getFeatureImage(language).height} alt={metadata_featureImageAlt[language]} className={s.image}/>
            </div>
        </section>
    )
}