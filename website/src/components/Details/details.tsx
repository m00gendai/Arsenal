import { title } from "../../text/text_details"
import type { Language } from "../../types/types_global"
import Details_supportedCalibers from "./details_supportedCalibers"
import Details_supportedCollections from "./details_supportedCollections"

interface Props{
    language: Language
}

export default function DetailsWrapper({language}:Props){
    return (
        <section className="content" id="details">
            <h1>{title[language]}</h1>

            <Details_supportedCollections language={language} />

            <Details_supportedCalibers language={language} />

        </section>
    )
}