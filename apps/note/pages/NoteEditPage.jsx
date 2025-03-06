const { Link, useNavigate, useParams, useSearchParams } = ReactRouterDOM;
import { noteService } from '../services/note.service.js';
import { KeepHeader } from '../cmps/KeepHeader.jsx';
import { KeepNav } from '../cmps/KeepNav.jsx';
const { useState, useEffect, useRef } = React;

import { ActionBtns } from "../cmps/ActionBtns.jsx";

export function NoteEditPage() {
    const navigate = useNavigate();
    const { noteId } = useParams();
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type');

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote());
    const [isUploadingFile, setIsUploadingFile] = useState(false);

    const txtRef = useRef(null);
    const formRef = useRef(null);
    const fileRef = useRef(null);

    useEffect(() => {
        if (noteId) loadNote();
        else navigate('/note');

        if (txtRef.current) { txtRef.current.focus(); }

        if ((type === 'img' || type === 'video') && fileRef.current) {
            fileRef.current.click();
        }
    }, [noteId, type]);

    const callBack = {};

    callBack.handleColor = (color) => {
        setNoteToEdit(prevNote => ({ ...prevNote, style: { ...prevNote.style, backgroundColor: color } }))
    }

    function loadNote() {
        noteService.get(noteId)
            .then(note => {
                setNoteToEdit(() => ({ ...note, type: type, state: 'addOne', info: { ...note.info, todos: note.info.todos || [] } }))
                console.log(' noteToEdit:', noteToEdit)
            })
            .catch(err => console.log('err:', err));
    }

    function onSaveNote(ev) {
        ev.preventDefault();

        if (!noteToEdit.info.title.trim() && !noteToEdit.info.txt.trim() && type === 'txt') return navigate('/note');

        noteService.save(noteToEdit)
            .then(() => navigate('/note'))
            .catch(err => console.log(err));
    }

    function handleChange({ target }) {
        const field = target.name;
        let value = target.value;

        if (field === 'txt') {
            target.style.height = 'auto';
            target.style.height = target.scrollHeight + "px";
        }

        if (field === 'img' || field === 'video') {
            setIsUploadingFile(true);
            value = target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setNoteToEdit(prevNote => ({
                    ...prevNote,
                    type: field,
                    info: { ...prevNote.info, img: value, url: reader.result }
                }));
                setTimeout(() => setIsUploadingFile(false), 500);
            };
            reader.readAsDataURL(value);
            return;
        }

        setNoteToEdit(prevNote => ({ ...prevNote, status: 'add', info: { ...prevNote.info, [field]: value } }));
    }

    function toggleTodo(index) {
        setNoteToEdit(prevNote => {
            const newTodos = [...(prevNote.info.todos || [])];
            newTodos[index].isDone = !newTodos[index].isDone;
            return { ...prevNote, info: { ...prevNote.info, todos: newTodos } };
        });
    }

    function addTodo() {
        setNoteToEdit(prevNote => ({
            ...prevNote,
            info: { ...prevNote.info, todos: [...(prevNote.info.todos || []), { txt: "", isDone: false }] }
        }));
    }

    function removeTodo(index) {
        setNoteToEdit(prevNote => {
            const newTodos = (prevNote.info.todos || []).filter((_, i) => i !== index);
            return { ...prevNote, info: { ...prevNote.info, todos: newTodos } };
        });
    }

    function handleTodoChange(index, newText) {
        setNoteToEdit(prevNote => {
            const newTodos = [...(prevNote.info.todos || [])];
            newTodos[index].txt = newText;
            return { ...prevNote, info: { ...prevNote.info, todos: newTodos } };
        });
    }

    const { title = '', txt = '', url, videoUrl, todos = [] } = noteToEdit.info || {};

    return (
        <section className="note-reset main-layout">
            <KeepHeader />
            <KeepNav />

            <Link to="/note">
                <div className="dark-screen-app"></div>
            </Link>

            <div style={{ backgroundColor: noteToEdit.style.backgroundColor || 'white' }} className="edit-container edit-layout">
                <section className="note-edit">
                    <form ref={formRef} onSubmit={onSaveNote}>

                        {(type === 'img' || type === 'video') && (
                            <input
                                ref={fileRef}
                                type="file"
                                accept={type === 'img' ? "image/*" : "video/*"}
                                name={type}
                                style={{ display: 'none' }}
                                onChange={handleChange}
                            />
                        )}

                        {type === 'img' && noteToEdit.info.url && <img src={noteToEdit.info.url} alt="Preview" />}
                        {type === 'video' && noteToEdit.info.videoUrl && (
                            <video controls>
                                <source src={noteToEdit.info.videoUrl} type="video/mp4" />
                            </video>
                        )}

                        {type === 'todos' && (
                            <div className="todos-container">
                                {todos.map((todo, index) => (
                                    <div key={index} className="todo-item">
                                        <button type="button" onClick={() => toggleTodo(index)}>
                                            {todo.isDone ? "☑" : "⬜"}
                                        </button>
                                        <input
                                            type="text"
                                            value={todo.txt}
                                            placeholder="Todo"
                                            onChange={(e) => handleTodoChange(index, e.target.value)}
                                        />
                                        <button type="button" onClick={() => removeTodo(index)}>X</button>
                                    </div>
                                ))}
                                <button style={{ paddingLeft: '30px' }} type="button" onClick={addTodo}>+ Add Todo</button>
                            </div>
                        )}

                        <input
                            placeholder='Title'
                            className='title'
                            onChange={handleChange}
                            value={title}
                            type="text"
                            name="title"
                            id="title"
                        />
                        {type !== 'todos' && (
                            <textarea
                                ref={txtRef}
                                className='txt'
                                placeholder='Take a note...'
                                onChange={handleChange}
                                value={txt}
                                name="txt"
                            ></textarea>
                        )}
                        <section className="flex">
                            <ActionBtns note={noteToEdit} callBack={callBack} />
                            <button className="close-btn" type="submit">Close</button>
                        </section>
                    </form>
                </section>
            </div>
        </section>
    );
}