import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeExternalLinks from 'rehype-external-links'

interface Props{
    text: string
}

export default function MarkdownText({text}:Props){
    return(
        <Markdown 
            remarkPlugins={[remarkGfm, remarkBreaks]}
            rehypePlugins={[[rehypeExternalLinks, {target: '_blank'}]]}
        >{text}</Markdown>
    )
}