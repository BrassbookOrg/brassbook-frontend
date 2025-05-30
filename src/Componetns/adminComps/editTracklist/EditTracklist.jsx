import React, { useState, useEffect } from 'react';
import styles from './EditTrackList.module.css';
import musics from '../../../assets/data';
import { timer } from './timer';
import edit from "../../../../public/edit-04.svg";
import trash from "../../../../public/trash-03.svg";

function EditTrackList({ props: { musicNumber, setMusicNumber } }) {

    const [musicList, setMusics] = useState(musics)
    const [musicsForSearch, setMusicsForSearch] = useState(musicList)
    const [searchQuery, setSearchQuery] = useState('')
    const [alphabetIsActive, setAlphabetIsActive] = useState(false)
    const [nAlphabet, setNAlphabet] = useState(0)
    const [nDuration, setNDuration] = useState(0)

    // function DurationFiltration(n) {
    //     switch (n) {
    //         case 0:
    //             break
    //         case 1:

    //     }
    // }

    const handleSearch = (e) => {
        const value = e.target.value
        setSearchQuery(value)

        const filtered = musicsForSearch.filter(item => {
            return item.title.toLowerCase().includes(value.toLowerCase())
        })

        if (filtered.length > 0) {
            setMusics(filtered)
        }
    }

    function AlphabetFiltration(n) {
        let sortedList = [...musicList];

        switch (n) {
            case 0: {
                sortedList = [...musics]; // Reset to original order
                setAlphabetIsActive(false)
                break
            }
            case 1: {
                sortedList.sort((a, b) => a.title.localeCompare(b.title))
                setAlphabetIsActive(true)
                break
            }
            case 2: {
                sortedList.sort((a, b) => b.title.localeCompare(a.title))
                break
            }
        }
        setMusics(sortedList)
    }

    function AplhabetHandler() {
        const newValue = nAlphabet === 2 ? 0 : nAlphabet + 1;
        setNAlphabet(newValue);
        AlphabetFiltration(newValue);
    }

    function deleteHandler(id) {
        const updatedList = musicList.filter(music => music.id !== id);
        setMusics(updatedList);

        if (musicNumber >= updatedList.length) {
            setMusicNumber(0);
        }
    }

    return (
        <div className={styles.tracklist}>
            <div className={styles.header}>
                <div className={styles.searchContainer}>
                    <img src="/music_search.svg" alt="" />
                    <input className={styles.searchInput} type="text" placeholder="Найти композицию в альбоме" value={searchQuery} onChange={handleSearch} />
                </div>
                <div className={styles.sort}>
                    <button type="button" className={styles.active}>Brassbook</button>
                    <button type="button" className={styles.sortAlf}>Диктофон</button>
                    <button type="button" className={styles.sortAlf}>Доп.трек</button>
                </div>
                <div className={styles.sort}>
                    <button className={alphabetIsActive ? styles.active : styles.sortAlf} onClick={() => { AplhabetHandler() }}>
                        <img src="/src/assets/images/alfavit.svg" alt="" />
                        <span>по алфавиту</span>
                    </button>
                    <button className={styles.sortAlf}>
                        <img src="/src/assets/images/popularity.svg" alt="" />
                        <span>по популярности</span>
                    </button>
                    <button className={styles.sortAlf}>
                        <img src="/src/assets/images/duration.svg" alt="" />
                        <span>по длительности</span>
                    </button>
                </div>
            </div>
            <ul className={styles.list}>
                {
                    musicList.map((music, index) => (
                        <li key={music.id} className={`${musicNumber === index ? styles.playing : ''}`}>
                            <div className={styles.row}>
                                <button onClick={() => setMusicNumber(index)} className={styles.descript}>
                                    <div className={styles.image}>
                                        <img src={music.thumbnail} alt="" />
                                        {/* <div className={styles.veil}>
                                            {musicNumber === index ? <span class="_icon-pause"></span> : <span class="_icon-play-white"></span>}
                                        </div> */}
                                    </div>
                                    <div className={styles.artist}>
                                        <span>{music.artist}</span>
                                    </div>
                                    <div className={styles.title}>
                                        <span>{music.title}</span>
                                    </div>
                                    {/* <div className={styles.duration}>
                                        <span>{music.duration}</span>
                                    </div> */}
                                    <Duration music={music} />
                                </button>
                                <div className={styles.controls}>
                                    <button className={styles.edit}>
                                        <img src={edit} alt="" />
                                    </button>
                                    <button className={styles.delete} onClick={() => { deleteHandler(music.id) }}>
                                        <img src={trash} alt="" />
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default EditTrackList;

const Duration = ({ music }) => {
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const audio = new Audio(music.src);
        audio.onloadedmetadata = function () {
            if (audio.readyState > 0) {
                setDuration(audio.duration);
            }
        }
    }, [music])

    return (
        <span className={styles.duration}>{timer(duration)}</span>
    )
}