interface Props{
    title: string
    content: (string | string[])[]
}

export default function Accordion({title, content}:Props){
    return(
        <details>
            <summary>
                {title}
            </summary>
            <div className="accordionContent">
                {content.map((entry, indx) => {
                    if(Array.isArray(entry)){
                        return(
                            <ul>
                                {entry.map((listItem, idx) => {
                                    return <li key={`accordion_listItem_${idx}`} dangerouslySetInnerHTML={{__html: listItem}}></li>
                                })}
                            </ul>
                        )
                    } else {
                        return <p style={{margin: "1rem"}} key={`accordion_text_${indx}`} dangerouslySetInnerHTML={{__html: entry}}></p>
                    }                   
                })}
            </div>
        </details>
    )
}