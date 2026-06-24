import type { Language, ReviewTranslation } from "../types/types_global"
import s from "../styles/reviews.module.css"
import Review from "./Review"
import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useState } from "react"

interface Props{
    reviewTranslations: any
    language: Language
}

export default function Reviews({ reviewTranslations, language}: Props){
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

    return(
        <div className={s.embla}>
            <div className={s.embla__viewport} ref={emblaRef}>
                <div className={s.embla__container}>
                    {reviewTranslations.map((review, index) =>{
                        return(
                            <div className={s.embla__slide} key={`slide_${index}`}><Review review={review} language={language}/></div>
                        )
                    })}
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

        </div>
    )
}