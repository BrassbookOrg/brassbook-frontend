import React, { useState, useEffect } from 'react';
import styles from './trackList.module.css';
import musics from '../../assets/data';
import { timer } from './timer';




const TrackList = ({ props: { musicNumber, setMusicNumber } }) => {

    const [musicList, setMusics] = useState(musics)
    let musicsFiltered = musics
    let nAlphabet = 0
    let nDuration = 0

    // function DurationFiltration(n) {
    //     switch (n) {
    //         case 0:
    //             break
    //         case 1:

    //     }
    // }

    function AlphabetFiltration(n) {
        switch (n) {
            case 0: {
                break
            }
            case 1: {
                musicsFiltered = musicsFiltered.sort((a, b) => a.title.localeCompare(b.title))
                setMusics(musicsFiltered)
                break
            }
            case 2: {
                musicsFiltered = musicsFiltered.sort((a, b) => b.title.localeCompare(a.title))
                setMusics(musicsFiltered)
                break
            }
        }
    }

    function AplhabetHandler() {
        if (nAlphabet === 2) {
            nAlphabet = 0
        } else {
            nAlphabet += 1
        }
        console.log(nAlphabet)
        AlphabetFiltration(nAlphabet)
    }


    return (
        <div className={styles.tracklist}>
            <div className={styles.header}>
                <div className={styles.favourite}>
                    <div className={styles.favText}>
                        <div className={styles.favTitle}>Избранное</div>
                        <div className={styles.favNumber}>{musics.length} <span>композиций</span></div>
                        <div className={styles.subtitle}>Композиции, отмеченные тобою <img src="/src/assets/images/heart-example.png" alt="" />, находятся здесь.</div>
                    </div>
                    <button className={styles.favButton}><img src="/src/assets/images/back.svg" alt="" /> Вернуться в Личный кабинет</button>
                    <div className={styles.bgImage}><img src="/src/assets/images/like-pic.png" alt="" /></div>
                </div>
                <div className={styles.search}>
                    <input type="text" className={styles.serachInput} placeholder='Найти композицию' />
                    <span className='_icon-music-list'></span>
                </div>
                <div className={styles.sort}>
                    <button onClick={() => {AplhabetHandler()}} className={styles.sortAlf}>
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
                                    <button className={styles.notes}>
                                        <span className='_icon-note'></span>
                                        <span>Ноты</span>
                                    </button>
                                    <button className={styles.like}>
                                        <div className='_icon-heart'></div>
                                    </button>
                                    <button className={styles.plus}>
                                        <div className={styles.plusBody}></div>
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
            <div className={styles.pagination}>
                <button className={styles.pagPrev}><img src="/src/assets/images/back.svg" alt="" /></button>
                <ul className={styles.pagList}>
                    <li>1</li>
                    <li>2</li>
                </ul>
                <button className={styles.pagNext}><img src="/src/assets/images/forward.svg" alt="" /></button>
            </div>
        </div>
    )
}

export default TrackList;

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