import { useState, useEffect } from "react"
import styles from "./PublicationsList.module.css"
import data from "../../pages/publications/PublicationsListExample.json"
import { Link } from "react-router-dom"
// import PublicationExample from "../../assets/forPublications/PublicationExample.jsx"
import firstPic from "../../assets/forPublications/titleImage.jpeg"
import secondPic from "../../assets/forPublications/photo.png"

const exampleMAP = {
    "contentExample": "PublicationExample",
    "firstExample": firstPic,
    "secondExample": secondPic
}

function PublicationsList({ list }) {

    const [searchQuery, setSearchQuery] = useState('')

    const [publications, setPublications] = useState(list || data)
    const [publicationsMutable, setPublicationsMutable] = useState(list || data)

    const [popularityIsActive, setPopularityIsActive] = useState(false)



    const handleSearch = (e) => {
        const value = e.target.value
        setSearchQuery(value)

        const filtered = publications.filter(item => {
            return item.title.toLowerCase().includes(value.toLowerCase())
        })
        console.log(filtered)

        if (filtered.length > 0) {
            setPublicationsMutable(filtered)
        }
    }

    return (
        <>
            <div>
                <h2 className={styles.h}>Публикации</h2>
                <p className={styles.caption}>Узнайте об актуальных новостях и об изнанке проекта Brassbook.</p>
                <div className={styles.searchContainer}>
                    <img src="/icon-park-outline_search.svg" alt="" />
                    <input className={styles.searchInput} type="text" placeholder="Найти нужную статью" value={searchQuery} onChange={handleSearch} />
                </div>
                <div className={styles.filtrationContainer}>
                    <button className={popularityIsActive ? styles.activeFiltration : styles.filtration}>
                        <img src={"/src/assets/images/popularity.svg"} alt="" />
                        <span>по популярности</span>
                    </button>
                </div>
                <ul className={styles.ul}>
                    {publicationsMutable.map((item) => (
                        <li className={styles.item} key={item.id}>
                            <Link to={`${item.id}`} state={exampleMAP[item.content]}>
                                <img className={styles.titleImage} src={exampleMAP[item.titleImage]} alt="" />
                                <p className={styles.title}>{item.title}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default PublicationsList