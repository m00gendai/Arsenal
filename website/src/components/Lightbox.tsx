import type { Image } from "./Gallery"
import s from "../styles/lightbox.module.css"

interface Props{
    image: Image
    currentIndex: number
    setLightboxVisible: React.Dispatch<React.SetStateAction<boolean>>
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
    imageCount: number
}

export default function Lightbox({image, currentIndex, setLightboxVisible, setCurrentIndex, imageCount}:Props){

    function closeOnBackdrop(e){
        if (e.target === e.currentTarget) {
            setLightboxVisible(false)
        }
    }

    function closeOnClose(){
        setLightboxVisible(false)
    }

    function indexing(mode: "backward" | "forward"){
        if(mode === "backward"){
            const newIndex = currentIndex > 0 ? currentIndex-1 : imageCount-1
            setCurrentIndex(newIndex)
        } else {
            const newIndex = currentIndex === imageCount-1 ? 0 : currentIndex+1
            setCurrentIndex(newIndex)
        }
    }

    function getGCD(a:number, b:number){
        let x = a
        let y = b
        let r
        while(y !== 0){
            r = x%y
            x = y
            y = r
        }
        
        return x
    }

    function getAspectRatio(image: Image){
        const width = image.width
        const height = image.height
        const gcd = getGCD(width, height)
        return `${width/gcd}/${height/gcd}`
    }

    const aspectRatio = getAspectRatio(image)

    return(
        <div className={s.wrapper} onClick={(e) => closeOnBackdrop(e)}>
            <div className={s.container} style={{aspectRatio: aspectRatio}}>
                <div className={s.menu}>
                    <div className={s.close} onClick={() => closeOnClose()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <title>window-close</title>
                            <path d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" />
                        </svg>
                    </div>
                </div>
                <div className={s.image}>
                    <img loading="lazy" src={image.src} alt={`App Screenshot`} />
                </div>
                <div className={s.bottommenu}>
                    <div className={s.arrow} onClick={()=>indexing("backward")}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <title>arrow-left-bold</title>
                            <path d="M20,9V15H12V19.84L4.16,12L12,4.16V9H20Z" />
                        </svg>
                    </div>
                    <div className={s.arrow} onClick={()=>indexing("forward")}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <title>arrow-right-bold</title>
                            <path d="M4,15V9H12V4.16L19.84,12L12,19.84V15H4Z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}