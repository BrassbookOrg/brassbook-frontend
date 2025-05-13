import { Link } from "react-router-dom";
import SideMenu from "../../Componetns/sideMenu/SideMenu";
import styles from './Admin.module.css';

function Admin() {

    return (
        <main className={styles.Admin}>
            <SideMenu activeSection={'admin'} />
            <div className={styles.contentContainer}>
                <h2 className={styles.h2}>Панель Администратора</h2>
                <div className={styles.wrapper}>
                    <h3 className={styles.h3}>ПРОИЗВЕДЕНИЯ</h3>
                    <div className={styles.buttons}>
                        <Link className={styles.button} to='./addMusic'>
                            <img src="../../../public/add-music.svg" alt="" />
                            Добавить Произведение
                        </Link>
                        <button className={styles.button}>
                            <img src="../../../public/redact-music.svg" alt="" />
                            Управление Произведениями
                        </button>
                    </div>
                </div>
                <div className={styles.wrapper}>
                    <h3 className={styles.h3}>СТАТЬИ</h3>
                    <div className={styles.buttons}>
                        <button className={styles.button}>
                            <img src="../../../public/add-article.svg" alt="" />
                            Добавить Статью
                        </button>
                        <button className={styles.button}>
                            <img src="../../../public/redact-article.svg" alt="" />
                            Управление Статьями
                        </button>
                    </div>
                </div>
                <div className={styles.wrapper}>
                    <h3 className={styles.h3}>БИБЛИОТЕКА</h3>
                    <div className={styles.buttons}>
                        <Link className={styles.button} to='./addNotes'>
                            <img src="../../../public/add-notes.svg" alt="" />
                            Добавить Ноты
                        </Link>
                        <button className={styles.button}>
                            <img src="../../../public/redact-notes.svg" alt="" />
                            Управление Нотами
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Admin