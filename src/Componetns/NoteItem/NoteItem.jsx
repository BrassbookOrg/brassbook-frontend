function NoteItem({ props: item, itemName, author, src, image }) {
    const downloadHandler = () => {
        const link = document.createElement('a')
        link.href = src
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
    return (
        <>
            <li>
                <div>
                    <p>{itemName}</p>
                    <p>{author}</p>
                </div>
                <button onClick={downloadHandler}>Скачать</button>
            </li>
        </>
    )
}

export default NoteItem