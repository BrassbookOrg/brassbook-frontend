import data from "./NoteAlbumExample.json"
import { useState } from "react"

function NoteAlbum ({props: album, name}) {
    // const [album, setAlbum] = useState(album)

    return (
        <>
            <div>
                <h3>{name}</h3>
                <span></span>
            </div>
        </>
    )
}

export default NoteAlbum