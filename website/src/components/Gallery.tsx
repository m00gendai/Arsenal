import s from "../styles/gallery.module.css"
import type { Language } from "../types/types_global"
import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useState } from "react"

interface Props{
    language: Language
    topic?: string
}

export default function Gallery({language, topic}:Props){
    
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
    const [scrollSnaps, setScrollSnaps] = useState([])
    const [selectedSnap, setSelectedSnap] = useState(0)

    const scrollTo = (index) => emblaApi?.scrollTo(index)
    const setupSnaps = (emblaApi) => setScrollSnaps(emblaApi.scrollSnapList())
    const setActiveSnap = (emblaApi) =>
    setSelectedSnap(emblaApi.selectedScrollSnap())

    useEffect(() => {
        if (!emblaApi) return

        setupSnaps(emblaApi)
        setActiveSnap(emblaApi)
        emblaApi.on('reInit', setupSnaps)
        emblaApi.on('reInit', setActiveSnap)
        emblaApi.on('select', setActiveSnap)
    }, [emblaApi])

    const screenshots = import.meta.glob(`../assets/screenshots/Screen*.jpg`, { eager: true })
    const filteredScreenshots = Object.entries(screenshots).filter(screen =>{
        const screenName = screen[0].split('/').pop()!
        const localLanguage = "en"
        return screenName.startsWith(`Screenshot_${topic}`) && screenName.endsWith(`_${localLanguage}.jpg`)
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
        <>
            <div className={s.embla}>
                <div className={s.embla__viewport} ref={emblaRef}>
                    <div className={s.embla__container}>
                        {images.map((image, index) => {
                            return (
                                <div className={s.embla__slide}>
                                    <div 
                                        key={`image_screen_${index}`}
                                        className={s.image} 
                                        style={{
                                            aspectRatio: `${image.width/image.height}/1`
                                        }}
                                    >
                                        <img loading="lazy" src={image.src} alt={`App Screenshot ${index+1}`}/>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className={s.embla__dots}>
                {scrollSnaps.map((_, index) => (
                    <button
                        className={`${s.embla__dot}${index === selectedSnap ? ` ${s['embla__dot--selected']}` : ''}`}
                        key={index}
                        onClick={() => scrollTo(index)}
                    >
                        {/* Button content */}
                    </button>
                ))}
            </div>
        </>
    )
}