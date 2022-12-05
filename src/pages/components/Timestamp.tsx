import GetDateAndTime from 'packages/Timestamp/GetDateAndTime'

const BlogTimestamp = (props: {
    raw: string
    withTime: boolean
    label: string
}) => {
    const data = GetDateAndTime(props.raw)

    return (
        <div className="timestamp">
            {props.label +
                ':' +
                data.date +
                ' ' +
                (props.withTime ? data.time : '')}
        </div>
    )
}

export default BlogTimestamp
