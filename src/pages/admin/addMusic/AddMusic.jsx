import SideMenu from "../../../Componetns/sideMenu/SideMenu"
import styles from "./AddMusic.module.css"
import { useNavigate } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import arrow from "../../../../public/backArrow.svg"
import pdfExampleImage from "../../../../public/pdfExample.svg"
import tic from "../../../../public/tic.svg"
import addImg from "../../../../public/gallery-add.svg"
import mp3File from "../../../../public/mp3.svg"

function AddMusic() {
    const navigate = useNavigate()
    const [isDragging, setIsDragging] = useState(false);
    const [mainComp, setMainComp] = useState(null);
    const [brassBook, setBrassBook] = useState(null);
    const [analiseComp, setAnaliseComp] = useState(null);
    const [pdf, setPdf] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const isValidFileType = (file) => {
        const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        return validTypes.includes(file.type) ||
            file.name.endsWith('.pdf') ||
            file.name.endsWith('.jpg') ||
            file.name.endsWith('.png') ||
            file.name.endsWith('.gif') ||
            file.name.endsWith('.webp') ||
            file.name.endsWith('.mp3');
    };

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e, setFile) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (isValidFileType(file)) {
                setFile(file);
            }
        }
    }, [])

    const handlePdfChange = (e) => {
        const file = e.target.files[0];
        if (file && isValidFileType(file)) {
            setPdf(file);
        }
    };

    const handleMainChange = (e) => {
        const file = e.target.files[0]
        if (file && isValidFileType(file)) {
            setMainComp(file);
        }
    }

    const handleBrassBookChange = (e) => {
        const file = e.target.files[0]
        if (file && isValidFileType(file)) {
            setBrassBook(file);
        }
    }

    const handleAnaliseChange = (e) => {
        const file = e.target.files[0]
        if (file && isValidFileType(file)) {
            setAnaliseComp(file);
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && isValidFileType(file)) {
            setImageFile(file)
        }
    };

    return (
        <main className={styles.AddNotes}>
            <SideMenu activeSection={'admin'} />
            <div className={styles.contentContainer}>
                <h2 className={styles.h2}>Добавить Ноты для Библиотеки</h2>
                <button className={styles.backButton} onClick={() => navigate('/adminPanel')}><img className={styles.backArrow} src={arrow} />Вернуться к Панели Администратора</button>
                <form className={styles.form}>
                    <div className={styles.wrapper}>
                        <label className={styles.label}>
                            Введите автора
                            <input className={styles.textInput} type="text" placeholder='Введите название' required />
                        </label>
                        <label className={styles.label}>
                            Введите название
                            <input className={styles.textInput} type="text" placeholder="Введите автора" required />
                        </label>
                        <label className={styles.label}>
                            Основная композиция
                            <br /> <span className={styles.span}>Этот трек будет отображаться первым, <br />как основное произведение.</span>
                            <div className={`${styles.dropZone} ${isDragging ? styles.dragging : ''}`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, setMainComp)}
                                onClick={() => { document.querySelector('#mainInput').click }}>

                                {mainComp ? (
                                    <>
                                        <div className={styles.pdfInfo}>
                                            <img src={mp3File} alt="" />
                                            <p>{mainComp.name}</p>
                                        </div>
                                        <button onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            setMainComp(null);
                                        }}>
                                            <img src={tic} alt="" />
                                        </button>
                                    </>
                                ) : (
                                    <p>Выберите основную композицию</p>
                                )}

                            </div>
                            <input id="mainInput" className={styles.fileInput} type="file" accept="audio/mp3" onChange={handleMainChange} required />
                        </label>
                        <label className={styles.label}>
                            Версия Brassbook
                            <br /> <span className={styles.span}>Этот трек будет отображаться вторым, <br />как версия от Brassbook.</span>
                            <div className={`${styles.dropZone} ${isDragging ? styles.dragging : ''}`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, setMainComp)}
                                onClick={() => { document.querySelector('#brassBookInput').click }}>

                                {brassBook ? (
                                    <>
                                        <div className={styles.pdfInfo}>
                                            <img src={mp3File} alt="" />
                                            <p>{brassBook.name}</p>
                                        </div>
                                        <button onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            setBrassBook(null);
                                        }}>
                                            <img src={tic} alt="" />
                                        </button>
                                    </>
                                ) : (
                                    <p>Выберите версию от Brassbook</p>
                                )}

                            </div>
                            <input id="brassBookInput" className={styles.fileInput} type="file" accept="audio/mp3" onChange={handleBrassBookChange} required />
                        </label>
                        <label className={styles.label}>
                            Версия для анализа
                            <br /> <span className={styles.span}>Этот версия произведения по которой будет <br />анализироваться игра пользователей.</span>
                            <div className={`${styles.dropZone} ${isDragging ? styles.dragging : ''}`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, setAnaliseComp)}
                                onClick={() => { document.querySelector('#analiseInput').click }}>

                                {analiseComp ? (
                                    <>
                                        <div className={styles.pdfInfo}>
                                            <img src={mp3File} alt="" />
                                            <p>{analiseComp.name}</p>
                                        </div>
                                        <button onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            setAnaliseComp(null);
                                        }}>
                                            <img src={tic} alt="" />
                                        </button>
                                    </>
                                ) : (
                                    <p>Выберите шаблон композиции</p>
                                )}

                            </div>
                            <input id="analiseInput" className={styles.fileInput} type="file" accept="audio/mp3" onChange={handleAnaliseChange} required />
                        </label>
                        <label className={styles.label}>
                            Ноты произведения
                            <br /> <span className={styles.span}>Загрузите ноты в формате pdf.</span>
                            <div className={`${styles.dropZone} ${isDragging ? styles.dragging : ''}`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, setPdf)}
                                onClick={() => { document.querySelector('#pdfInput').click }}>

                                {pdf ? (
                                    <>
                                        <div className={styles.pdfInfo}>
                                            <img src={pdfExampleImage} alt="" />
                                            <p>{pdf.name}</p>
                                        </div>
                                        <button onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            setPdf(null);
                                        }}>
                                            <img src={tic} alt="" />
                                        </button>
                                    </>
                                ) : (
                                    <p>Выберите ноты произведения</p>
                                )}

                            </div>
                            <input id="pdfInput" className={styles.fileInput} type="file" accept=".pdf,application/pdf" onChange={handlePdfChange} required />
                        </label>
                    </div>

                    <label className={styles.label}>
                        Обложка
                        <br /> <span className={styles.span}>Загрузите обложку самостоятельно или выберите из предложенных</span>
                        <div className={styles.imageContainer}
                            onClick={() => { document.querySelector('#imageInput').click }}
                        >

                            {imageFile ? (
                                <>
                                    <img src={imageFile} alt="" />
                                </>
                            ) : (
                                <>
                                    <img src={addImg} alt="" />
                                    <p className={styles.addImgP}>Нажмите, <br />чтобы выбрать фото</p>
                                </>
                            )}

                        </div>
                        <input id="imageInput" className={styles.fileInput} type="file" accept="image/*" onChange={handleImageChange} />
                    </label>
                    <button type='submit' className={styles.submitButton}>ЗАГРУЗИТЬ ПРОИЗВЕДЕНИЕ</button>
                </form>
            </div>
        </main>
    )
}

export default AddMusic