import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { CodeProps } from 'react-markdown/lib/ast-to-react'

const CodeBlock = ({ className, children, ...props }: CodeProps) => {
    const match = /language-(\w+)/.exec(className || '')
    return (
        <SyntaxHighlighter
            {...props}
            style={docco}
            className="blog-view-code"
            PreTag="div"
            language={match ? match[1] : 'language-shell'}
        >
            {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
    )
}

const Markdown = (props: { body: string }) => {
    return (
        <>
            <ReactMarkdown
                rehypePlugins={[rehypeRaw, remarkGfm]}
                children={props.body}
                components={{
                    code: (props) => <CodeBlock {...props} />,
                }}
            />
        </>
    )
}

export default Markdown
