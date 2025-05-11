import SideMenu from "../../../Componetns/sideMenu/SideMenu"
import styles from "./AddNotes.module.css"
import { useNavigate } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import arrow from "../../../../public/backArrow.svg"
import pdfExampleImage from "../../../../public/pdfExample.svg"
import tic from "../../../../public/tic.svg"
import addImg from "../../../../public/gallery-add.svg"

function AddNotes() {
    const navigate = useNavigate()
    const [isDragging, setIsDragging] = useState(false);
    const [pdfFile, setPdfFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const isValidFileType = (file) => {
        const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        return validTypes.includes(file.type) ||
            file.name.endsWith('.pdf') ||
            file.name.endsWith('.jpg') ||
            file.name.endsWith('.png') ||
            file.name.endsWith('.gif') ||
            file.name.endsWith('.webp');
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
            setPdfFile(file);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && isValidFileType(file)) {
            setImageFile('http://localhost:5173/adminPanel/addNotes')
        }
    };

    return (
        <main className={styles.AddNotes}>
            <SideMenu activeSection={'admin'} />
            <div className={styles.contentContainer}>
                <h2 className={styles.h2}>Добавить Ноты для Библиотеки</h2>
                <button className={styles.backButton} onClick={() => navigate('/adminPanel')}><img className={styles.backArrow} src={arrow} />Вернуться к Панели Администратора</button>
                <form className={styles.form}>
                    <label className={styles.label}>
                        Введите название
                        <input className={styles.textInput} type="text" placeholder='Введите название' required />
                    </label>
                    <label className={styles.label}>
                        Введите автора
                        <input className={styles.textInput} type="text" placeholder="Введите автора" required />
                    </label>
                    <label className={styles.label}>
                        Ноты произведения
                        <br /> <span className={styles.span}>Загрузите ноты в формате pdf.</span>
                        <div className={`${styles.dropZone} ${isDragging ? styles.dragging : ''}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, setPdfFile)}
                            onClick={() => { document.querySelector('#pdfInput').click }}>

                            {pdfFile ? (
                                <>
                                    <div className={styles.pdfInfo}>
                                        <img src={pdfExampleImage} alt="" />
                                        <p>{pdfFile.name}</p>
                                    </div>
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        setPdfFile(null);
                                    }}>
                                        <img src={tic} alt="" />
                                    </button>
                                </>
                            ) : (
                                <p>Выберите PDF</p>
                            )}

                        </div>
                        <input id="pdfInput" className={styles.fileInput} type="file" accept=".pdf,application/pdf" onChange={handlePdfChange} required />
                    </label>
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
                    <button type='submit' className={styles.submitButton}>ЗАГРУЗИТЬ НОТЫ</button>
                </form>
            </div>
        </main>
    )
}

export default AddNotes