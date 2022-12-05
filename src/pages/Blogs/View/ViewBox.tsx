import { useNavigate } from 'react-router-dom'
import Markdown from 'pages/Blogs/Markdown/Markdown'
import TagList from 'pages/components/TagList'
import BlogTimestamp from 'pages/components/Timestamp'

const ViewBox = (props: {
    article: any
    tag_click: boolean
    showTimestamp: boolean
}) => {
    const navigate = useNavigate()

    return (
        <>
            <div className="blog-view-header">
                <p className="blog-view-provider-mark">Peruki's Blog</p>
                <p className="blog-view-title">{props.article.title}</p>
                <p className="blog-view-subtitle">{props.article.subtitle}</p>
                <br />
                {props.showTimestamp ? (
                    <>
                        <BlogTimestamp
                            raw={props.article.created_at}
                            withTime={true}
                            label={'記事作成日'}
                        />
                        <br />
                        <BlogTimestamp
                            raw={props.article.updated_at}
                            withTime={true}
                            label={'最終更新日'}
                        />
                        <br />
                    </>
                ) : (
                    <></>
                )}
                <br />
                <TagList
                    tags={props.article.tags}
                    onPushTag={(tag_query) => {
                        if (props.tag_click)
                            navigate('/blog?search=%23' + tag_query)
                    }}
                />
            </div>
            <Markdown body={props.article.body} />
        </>
    )
}

export default ViewBox
