import PublicationExample from "../../../assets/forPublications/PublicationExample.jsx"
import { useLocation, useNavigate } from "react-router-dom"
import SideMenu from "../../../Componetns/sideMenu/SideMenu.jsx"
import styles from "./Publication.module.css"
import arrow from "../../../../public/backArrow.svg"

const toRender = {
    "PublicationExample": PublicationExample
}

function Publication() {
    const navigate = useNavigate()
    const {state} = useLocation()
    const Article = toRender[state]
    return (
        <main className={styles.Publication}>
            <SideMenu activeSection={'publications'} />
            <div className={styles.contentContainer}>
                <button className={styles.backButton} onClick={() => navigate(-1)}><img src={arrow} />Вернуться назад</button>
                <Article className={styles.Article} />
            </div>
        </main>
    )
}

export default Publication