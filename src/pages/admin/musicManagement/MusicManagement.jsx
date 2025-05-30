import SideMenu from "../../../Componetns/sideMenu/SideMenu.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MusicManagement.module.css";
import EditTrackList from "../../../Componetns/adminComps/editTracklist/EditTracklist.jsx";
import arrow from "../../../../public/backArrow.svg";
import Card from "../../../Componetns/New_favorites/Card.jsx";

function MusicManagement() {
    const navigate = useNavigate()
    const [musicNumber, setMusicNumber] = useState(0);

    return (
        <main className={styles.AddNotes}>
            <SideMenu activeSection={'admin'} />
            <div className={styles.contentContainer}>
                <h2 className={styles.h2}>Управление Произведениями</h2>
                <button className={styles.backButton} onClick={() => navigate('/adminPanel')}><img className={styles.backArrow} src={arrow} />Вернуться к Панели Администратора</button>
                <EditTrackList className={styles.list} props={{musicNumber, setMusicNumber}}/>
            </div>
            <Card className={styles.player} props={{musicNumber, setMusicNumber}}/>
        </main>
    )
}

export default MusicManagement