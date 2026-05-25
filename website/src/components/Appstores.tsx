import type { Language } from "../types/types_global"
import androidBadge_de from "../assets/android_de.svg"
import androidBadge_en from "../assets/android_en.svg"
import androidBadge_fr from "../assets/android_fr.svg"
import androidBadge_it from "../assets/android_it.svg"
import iosBadge_de from "../assets/ios_de.svg"
import iosBadge_en from "../assets/ios_en.svg"
import iosBadge_fr from "../assets/ios_fr.svg"
import iosBadge_it from "../assets/ios_it.svg"
import s from "../styles/appstores.module.css"
import { starsText } from "../text/text_appstores"

interface Props{
	language: Language
}

export default async function Appstores({language}:Props){

    async function getAppstoreData(){
        const fetchAppstoreData = await fetch(
            "https://itunes.apple.com/lookup?id=6670214648&country=ch"
        )
        
        const appstoreData = await fetchAppstoreData.json();

        return appstoreData.results[0]


    }

    const { userRatingCount, averageUserRating } = await getAppstoreData()

    const percentRating = averageUserRating*20
    const ratingText = `${starsText[language].replace("{{{A}}}", averageUserRating.toString()).replace("{{{B}}}", userRatingCount.toString())}`

    function getAndroidBadge(lang: Language){
        switch(lang){
            case "de":
                return androidBadge_de
            case "en":
                return androidBadge_en
            case "fr":
                return androidBadge_fr
            case "it":
                return androidBadge_it
            default:
                return androidBadge_en
        }
    }

    function getIosBadge(lang: Language){
        switch(lang){
            case "de":
                return iosBadge_de
            case "en":
                return iosBadge_en
            case "fr":
                return iosBadge_fr
            case "it":
                return iosBadge_it
            default:
                return iosBadge_en
        }
    }

    return (
        <section className="content fullWidth highLight">
            <div className={s.container}>
                <a className={s.badge} href={`https://play.google.com/store/apps/details?id=com.m00gendai.arsenal&pli=1&hl=${language}`} target="_blank">
                    <img 
                        src={getAndroidBadge(language).src} 
                        width={getAndroidBadge(language).width} 
                        style={{ width: "100%", height: "auto" }}
                        height={getAndroidBadge(language).height} 
                        alt="Google Playstore Download Link" 
                    />
                </a>
                <div className={`${s.rating} ${s.desktop}`} title={ratingText}>
                    <div className={s.star}>
                        <span className={s.stars} style={{
                            background: `linear-gradient(90deg, #ffd700 0%, #ffed4e ${percentRating/2}%, #ffd700 ${percentRating}%, rgb(255, 251, 255) ${percentRating}%, rgb(255, 251, 255) 100%)`,
                            backgroundClip: "text"
                        }}>
                        ★★★★★</span>
                    </div>
                    <div className={s.text}>
                        <span>{ratingText}</span>
                    </div>
                </div>
                <a className={s.badge} href={`https://apps.apple.com/app/arsenal-armamentarium/id6670214648`} target="_blank">
                    <img 
                        src={getIosBadge(language).src} 
                        width={getIosBadge(language).width} 
                        height={getIosBadge(language).height}
                        style={{ width: "100%", height: "auto" }}
                        alt="AppleAppstore Download Link" 
                    />
                </a>
                <div className={`${s.rating} ${s.mobile}`} title={ratingText}>
                    <div className={s.star}>
                        <span className={s.stars} style={{
                            background: `linear-gradient(90deg, #ffd700 0%, #ffed4e ${percentRating/2}%, #ffd700 ${percentRating}%, rgb(255, 251, 255) ${percentRating}%, rgb(255, 251, 255) 100%)`,
                            backgroundClip: "text"
                        }}>
                        ★★★★★</span>
                    </div>
                    <div className={s.text}>
                        <span>{ratingText}</span>
                    </div>
                </div>
            </div>
        </section>
    )
}