import React from "react"
import { salesPitch } from "../text/text_salesPitch"
import type { Language } from "../types/types_global"
import { metadata_title } from "../text/text_metadata"

interface Props{
    language: Language
}

export default function SalesPitch({language}:Props){
    return (
        <section className="content" id="home">
            <h1>{metadata_title[language]}</h1>
            <p dangerouslySetInnerHTML={{__html : salesPitch[language].tagline}}></p>
            {salesPitch[language].topics.map((topic, index) => {
                return (
                    <React.Fragment key={`topic_index${index}_tagline`}>
                        <p style={{marginBottom: 0}} dangerouslySetInnerHTML={{__html : topic.intro}}></p>
                        {topic.list ?
                            <ul>
                                {topic.list.map((listItem, indx) => {
                                    return <li key={`topicList_index${indx}_listItem`} dangerouslySetInnerHTML={{__html : listItem}}></li>
                                })}
                            </ul>
                        : 
                            null
                        }
                        {topic.outro ? 
                            <p style={{margin: 0}} key={`topic_index${index}_outro`} dangerouslySetInnerHTML={{__html : topic.outro}}></p>
                        :
                            null
                        }
                    </React.Fragment>
                )
            })}
        </section>
    )
}