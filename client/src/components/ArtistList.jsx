import React from 'react'

export default ({ artists }) => {
    return (
        <div>
            {artists.map((artist) => { return <p>{artist.name}</p> })}
        </div>
    )
}