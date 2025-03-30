

function AlbumLibrary(list) {
    console.log(list)
    return (
        <div>
            {list.list.map((item) => (
                    <div>
                        <img src={item.src} alt="" />
                        <p>{item.name}</p>
                        <svg></svg>
                    </div>
            ))
            }
        </div>
    )
}

export default AlbumLibrary