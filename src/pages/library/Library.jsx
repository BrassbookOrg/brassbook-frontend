import { useState } from "react";
import SideMenu from "../../Componetns/sideMenu/SideMenu";
import NoteList from "../../Componetns/NoteList/NoteList";
import NoteAlbumList from "../../Componetns/NoteAlbumList/NoteAlbumList";

function Library(props) {
    const [selectedAlbum, setSelectedAlbum] = useState(null)

    return (
        <>
            <SideMenu activeSection={'library'} />
            <div>
                <NoteAlbumList />
                <NoteList list={null} />
            </div>
        </>
    )
};

export default Library;