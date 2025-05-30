import SideMenu from "../../../Componetns/sideMenu/SideMenu";
import styles from "./AddArticle.module.css";
import { useNavigate } from "react-router-dom";
import arrow from "../../../../public/backArrow.svg";
import { useState, useEffect } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

function AddArticle() {
    const navigate = useNavigate();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [content, setContent] = useState('');

    const htmlContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    // useEffect(() => {
    //     const initialContent = '<p>Начните писать здесь...</p>';
    //     const blocksFromHtml = htmlToDraft(initialContent);
    //     const { contentBlocks, entityMap } = blocksFromHtml;
    //     const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    //     setEditorState(EditorState.createWithContent(contentState));
    // }, []);

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
        setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    };

    return (
        <main className={styles.AddNotes}>
            <SideMenu activeSection={'admin'} />
            <div className={styles.contentContainer}>
                <h2 className={styles.h2}>Добавить Статью</h2>
                <button className={styles.backButton} onClick={() => navigate('/adminPanel')}>
                    <img className={styles.backArrow} src={arrow} alt="Назад" />
                    Вернуться к Панели Администратора
                </button>
                <form className={styles.form}>
                    <label className={styles.label}>Введите заголовок
                        <input className={styles.textInput} type="text" placeholder="Введите название статьи" required />
                    </label>
                    <label className={styles.label}>Введите краткое описание
                        <input className={styles.textInput} type="text" placeholder="Введите краткое описание статьи (пара предложений)" required />
                    </label>
                    <label className={styles.label}>Добавьте ссылку (если есть оригинальная статья)
                        <input className={styles.textInput} type="text" placeholder="Добавьте ссылку на статью" required />
                    </label>
                    <label className={styles.label}>Основной текст статьи
                        <div>
                            <Editor
                                editorState={editorState}
                                onEditorStateChange={onEditorStateChange}
                                wrapperClassName={styles.editorWrapper}
                                editorClassName={styles.editor}
                                toolbar={{
                                    options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'emoji', 'image', 'remove', 'history'],
                                    inline: {
                                        options: ['bold', 'italic', 'underline', 'strikethrough']
                                    },
                                    blockType: {
                                        options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote']
                                    },
                                    list: { options: ['unordered', 'ordered'] },
                                    textAlign: { options: ['left', 'center', 'right', 'justify'] }
                                }}
                            />
                        </div>
                    </label>
                </form>
            </div>
        </main>
    );
}

export default AddArticle;