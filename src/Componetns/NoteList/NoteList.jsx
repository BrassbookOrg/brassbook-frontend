import NoteItem from "../NoteItem/NoteItem";
import { useState, useEffect } from "react";
import data from "./NoteListExample.json"

function NoteList({ list }) {
    const [nAlphabet, setNAlphabet] = useState(0)
    const [searchQuery, setSearchQuery] = useState('')

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

    function AlphabetFiltration(n) {
        let sortedList = [...notes];

        switch (n) {
            case 0: {
                sortedList = [...noteList]; // Reset to original order
                break
            }
            case 1: {
                sortedList.sort((a, b) => a.name.localeCompare(b.name))
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
                <p>Все композиции</p>
                <div>
                    <span></span>
                    <input type="text" placeholder="Найти композицию в альбоме" value={searchQuery} onChange={handleSearch} />
                </div>
                <div>
                    <button onClick={() => { AplhabetHandler() }}>
                        <img src="/src/assets/images/alfavit.svg" alt="" />
                        <span>по алфавиту</span>
                    </button>
                    <button>
                        <img src="/src/assets/images/popularity.svg" alt="" />
                        <span>по популярности</span>
                    </button>
                </div>
                <ul>
                    {notes.map((item) => (
                        <NoteItem key={item.id} item={item} itemName={item.name} author={item.author} src={item.src} image={item.image} />
                    ))}
                </ul>
            </div>
        </>
    )
}

export default NoteList