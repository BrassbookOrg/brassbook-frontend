import NoteAlbum from "../NoteAlbum/NoteAlbum";
import { useState } from "react";
import data from "./NoteAlbumListExample.json";
import { Link } from "react-router-dom";

function NoteAlbumList({ props }) {
    const [noteAlbums, setNoteAlbums] = useState(data)
    const selectHandler = (album) => {
        return () => {
            onAlbumSelect(album)
        }
    }

    return (
        <>
            <div>
                <div>
                    <h2>Подборки произведений и композиций</h2>
                    <p>Самые востребованные музыкальные произведения, собранные по интересам и тематикам.</p>
                </div>

                <ul>
                    {noteAlbums.map((album) => (
                        <li key={album.id}>
                            <Link to='./librarySelected' state={{ album }}>
                                <NoteAlbum album={album} name={album.name} />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default NoteAlbumList