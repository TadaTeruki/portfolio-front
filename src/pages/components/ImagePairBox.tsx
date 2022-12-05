import React from 'react'

const ImagePairBox = (props: { image: string; children: React.ReactNode }) => {
    return (
        <div style={{ display: 'flex' }}>
            <div>{props.children}</div>
            <img
                src={props.image}
                style={{ marginLeft: 'auto' }}
                alt="perukun"
            />
        </div>
    )
}

export default ImagePairBox
