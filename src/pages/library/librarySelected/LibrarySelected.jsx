import { useParams, useLocation } from "react-router-dom"
import SideMenu from "../../../Componetns/sideMenu/SideMenu"
import NoteList from "../../../Componetns/NoteList/NoteList"
import NoteAlbum from "../../../Componetns/NoteAlbum/NoteAlbum"

function LibrarySelected ({}) {
    const {id} = useParams()
    const {state} = useLocation()
    const album = state?.album
    console.log(album.NoteList)

    return (
        <>
        <SideMenu activeSection={'library'} />
        <div>
            <NoteAlbum album={album} name={album.name} />
            <NoteList list={album.NoteList} />
        </div>
        </>
    )
}

export default LibrarySelected