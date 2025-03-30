import { useState } from "react";

import SideMenu from "../../Componetns/sideMenu/SideMenu";
import AlbumLibrary from "../../Componetns/AlbumLibrary/AlbumLibrary";
import albumJSON from "./albums.json"
import TrackList from "../../Componetns/New_favorites/TrackList";

function Library() {
    const [musicNumber, setMusicNumber] = useState(0);
    return (
        <main>
            <SideMenu activeSection={'library'} />
            <div>
                <div>
                    <h2>Подборки произведений и композицийы</h2>
                    <p>Самые востребованные музыкальные произведения, собранные по интересам и тематикам.</p>
                    <AlbumLibrary list={albumJSON} />
                </div>
                <TrackList props={{musicNumber, setMusicNumber}} />
            </div>
        </main>
    );
}

export default Library;