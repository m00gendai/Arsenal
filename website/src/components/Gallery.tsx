import { string } from "astro:schema"
import s from "../styles/gallery.module.css"
import type { Language } from "../types/types_global"
import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useState } from "react"
import Lightbox from "./Lightbox"

interface Props{
    language: Language
    topic?: string
}

export interface Image{
    src: string
    alt: string
    width: number
    height: number
}

export default function Gallery({language, topic}:Props){
    
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
    const [scrollSnaps, setScrollSnaps] = useState([])
    const [selectedSnap, setSelectedSnap] = useState(0)
    const [lightboxVisible, setLightboxVisible]= useState<boolean>(false)
    const [currentIndex, setCurrentIndex] = useState<number>(0)

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
    const images: Image[] = sortedScreenshots.map(screen => {
        return screen[1].default
    })

    function fullScreen(index: number){
        setLightboxVisible(true)
        setCurrentIndex(index)
    }

    return(
        <>
            <div className={s.embla}>
                <div className={s.embla__viewport} ref={emblaRef}>
                    <div className={s.embla__container}>
                        {images.map((image, index) => {
                            return (
                                <div className={s.embla__slide} key={`image_screen_${index}`}>
                                    <div 
                                        className={s.image} 
                                        style={{
                                            aspectRatio: `${image.width/image.height}/1`
                                        }}
                                    >
                                        <img style={{cursor: "pointer"}} loading="lazy" src={image.src} alt={`App Screenshot ${index+1}`} onClick={()=> fullScreen(index)} />
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
            {lightboxVisible ? <Lightbox image={images[currentIndex]} lightboxVisible={lightboxVisible} setLightboxVisible={setLightboxVisible} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} imageCount={images.length}/> : null}
        </>
    )
}