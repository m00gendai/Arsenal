import s from "../styles/gallery.module.css"
import type { Language } from "../types/types_global"

interface Props{
    language: Language
}

export default function Gallery({language}:Props){

    const screenshots = import.meta.glob(`../assets/screenshots/Screen*.jpg`, { eager: true })
    const filteredScreenshots = Object.entries(screenshots).filter(screen =>{
        return screen[0].endsWith(`_${language}.jpg`)
    })
    const sortedScreenshots = filteredScreenshots.sort((a,b) => {
        const x = a[0]
        const y = b[0]
        return x > y ? 1 : x < y ? -1 : 0
    })
    const images = sortedScreenshots.map(screen => {
        return screen[1].default
    })

    return(
        <section className="content">
            <div className={s.gallery}>
                {images.map((image, index) => {
                    return (
                        <div 
                        key={`image_screen_${index}`}
                            className={s.image} 
                            style={{
                                aspectRatio: `${image.width/image.height}/1`
                            }}
                        >
                            <img loading="lazy" src={image.src} alt={`App Screenshot ${index+1}`}/>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}