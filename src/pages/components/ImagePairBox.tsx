import React from 'react'

const ImagePairBox = (props: { image: string; children: React.ReactNode }) => {
    return (
        <div className="image-pair-box">
            <div className="image-pair-box-text">{props.children}</div>
            <img src={props.image} alt="perukun" />
        </div>
    )
}

export default ImagePairBox
