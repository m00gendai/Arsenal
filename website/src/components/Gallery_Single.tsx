import s from "../styles/gallery_single.module.css"
import type { Language } from "../types/types_global"
import type { ImageMetadata } from "astro";

interface Props{
    language: Language
    image: ImageMetadata
}

export default function Gallery_Single({image}:Props){
    
    return(
        <div className={s.container}>
            <img src={image.src} width={image.width} height={image.height} />
        </div>
    )
}