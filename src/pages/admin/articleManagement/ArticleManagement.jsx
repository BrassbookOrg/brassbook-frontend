import SideMenu from "../../../Componetns/sideMenu/SideMenu.jsx";
import EditArticlelist from "../../../Componetns/adminComps/editArticlelist/EditArticlelist.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ArticleManagement.module.css";
import arrow from "../../../../public/backArrow.svg";

function ArticleManagement() {
    const navigate = useNavigate()

    return (
        <main className={styles.AddNotes}>
            <SideMenu activeSection={'admin'} />
            <div className={styles.contentContainer}>
                <h2 className={styles.h2}>Управление Нотами</h2>
                <button className={styles.backButton} onClick={() => navigate('/adminPanel')}><img className={styles.backArrow} src={arrow} />Вернуться к Панели Администратора</button>
                <EditArticlelist />
            </div>
        </main>
    )
}

export default ArticleManagement