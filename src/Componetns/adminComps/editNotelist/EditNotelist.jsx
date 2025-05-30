import { useState, useEffect } from "react";
import data from "../../NoteList/NoteListExample.json";
import styles from "./EditNotelist.module.css";
import edit from "../../../../public/edit-04.svg";
import trash from "../../../../public/trash-03.svg";
import exampleJPEG from "../../../assets/forLibrary/example.jpeg";

const exampleMAP = {
    'example.jpeg': exampleJPEG
}

function EditNotelist({ list }) {
    const [nAlphabet, setNAlphabet] = useState(0)
    const [searchQuery, setSearchQuery] = useState('')
    const [alphabetIsActive, setAlphabetIsActive] = useState(false)
    const [popularityIsActive, setPopularityIsActive] = useState(false)

    const [notes, setNotes] = useState(list || data)
    console.log(notes)
    useEffect(() => {
        if (list) {
            setNotes(list);
        }
    }, [list])
    const [noteList, setNoteList] = useState(list || data)
    useEffect(() => {
        if (list) {
            setNoteList(list);
        }
    }, [list])

    const handleSearch = (e) => {
        const value = e.target.value
        setSearchQuery(value)

        const filtered = noteList.filter(item => {
            return item.name.toLowerCase().includes(value.toLowerCase())
        })

        if (filtered.length > 0) {
            setNotes(filtered)
        }
    }

    function deleteHandler(id) {
        const updatedList = notes.filter(music => music.id !== id);
        setNotes(updatedList);
    }

    function AlphabetFiltration(n) {
        let sortedList = [...notes];

        switch (n) {
            case 0: {
                sortedList = [...noteList]; // Reset to original order
                setAlphabetIsActive(false)
                break
            }
            case 1: {
                sortedList.sort((a, b) => a.name.localeCompare(b.name))
                setAlphabetIsActive(true)
                break
            }
            case 2: {
                sortedList.sort((a, b) => b.name.localeCompare(a.name))
                break
            }
        }
        setNotes(sortedList)
    }

    function AplhabetHandler() {
        const newValue = nAlphabet === 2 ? 0 : nAlphabet + 1;
        setNAlphabet(newValue);
        AlphabetFiltration(newValue);
    }


    return (
        <>
            <div>
                <h2 className={styles.caption}>Все композиции</h2>
                <div className={styles.searchContainer}>
                    <img src="/music_search.svg" alt="" />
                    <input className={styles.searchInput} type="text" placeholder="Найти композицию в альбоме" value={searchQuery} onChange={handleSearch} />
                </div>
                <div className={styles.filtrationContainer}>
                    <button className={alphabetIsActive ? styles.activeFiltration : styles.filtration} onClick={() => { AplhabetHandler() }}>
                        <img src={alphabetIsActive ? "/alphabetActive.svg" : "/src/assets/images/alfavit.svg"} alt="" />
                        <span>по алфавиту</span>
                    </button>
                    <button className={popularityIsActive ? styles.activeFiltration : styles.filtration}>
                        <img src={"/src/assets/images/popularity.svg"} alt="" />
                        <span>по популярности</span>
                    </button>
                </div>
                <ul className={styles.list}>
                    {notes.map((item) => (
                        <li key={item.id} className={styles.NoteItem}>
                            <img className={styles.img} src={exampleMAP[item.img]} alt="" />
                            <div className={styles.gradient}></div>
                            <div className={styles.controls}>
                                <button className={styles.edit}>
                                    <img src={edit} alt="" />
                                </button>
                                <button className={styles.delete} onClick={() => { deleteHandler(item.id) }}>
                                    <img src={trash} alt="" />
                                </button>
                            </div>
                            <div className={styles.pContainer}>
                                <p className={styles.itemName}>{item.name}</p>
                                <p className={styles.author}>{item.author}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default EditNotelist