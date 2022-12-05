const TagList = (props: {
    tags: string[]
    onPushTag: (tag: string) => void
}) => {
    var items: any = []
    for (let i = 0; i < props.tags.length; i++) {
        if (props.tags[i] === '') continue
        items.push(
            <div
                className="tag-list"
                onClick={(event) => {
                    event.stopPropagation()
                    props.onPushTag(props.tags[i])
                }}
            >
                #{props.tags[i]}
            </div>,
        )
    }

    return (
        <div className="tag-list-base">
            {items.length !== 0 ? <>{items}</> : <></>}
        </div>
    )
}

export default TagList
