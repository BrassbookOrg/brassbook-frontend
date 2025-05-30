import SideMenu from "../../../Componetns/sideMenu/SideMenu.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotesManagement.module.css";
import EditNotelist from "../../../Componetns/adminComps/editNotelist/EditNotelist.jsx";
import arrow from "../../../../public/backArrow.svg";

function NotesManagement() {
    const navigate = useNavigate()

    return (
        <main className={styles.AddNotes}>
            <SideMenu activeSection={'admin'} />
            <div className={styles.contentContainer}>
                <h2 className={styles.h2}>Управление Нотами</h2>
                <button className={styles.backButton} onClick={() => navigate('/adminPanel')}><img className={styles.backArrow} src={arrow} />Вернуться к Панели Администратора</button>
                <EditNotelist className={styles.list}/>
            </div>
        </main>
    )
}

export default NotesManagement