import SideMenu from "../../Componetns/sideMenu/SideMenu";
import PublicationsList from "../../Componetns/publiactionsList/PublicationsList";
import data from "./PublicationsListExample.json"
import { useState } from "react";
import styles from "./Publications.module.css"

function Publications() {

    const [list] = useState(data)
    return (
        <main className={styles.Publications}>
            <SideMenu activeSection={'publications'} />
            <div className={styles.contentContainer}>
                <PublicationsList className={styles.PublicationsList} list={list} />
            </div>
        </main>
    )
}

export default Publications