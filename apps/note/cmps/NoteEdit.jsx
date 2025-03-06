const { useState, useEffect, useRef } = React

import { noteService } from "../services/note.service.js";
import { ActionBtns } from "./ActionBtns.jsx";
import { ImgInput } from "./ImgInput.jsx";

export function NoteEdit({ type, callBack, setIsEdit }) {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const [isUploadingFile, setIsUploadingFile] = useState(false)

    const txtRef = useRef(null)
    const formRef = useRef(null)
    const fileRef = useRef(null)

    const handleBlur = (ev) => {
        setTimeout(() => {
            if (isUploadingFile) return;
            if (formRef.current && !formRef.current.contains(document.activeElement)) {
                onSaveNote(ev);
            }
        }, 100);
    }

    callBack.handleColor = (color) => {
        setNoteToEdit(prevNote => ({ ...prevNote, style: { backgroundColor: color } }))
    }

    useEffect(() => {
        if (txtRef.current) {
            txtRef.current.focus()
        }
        if ((type === 'img' || type === 'video') && fileRef.current) {
            fileRef.current.click();
        }
        setNoteToEdit(prevNote => ({ ...prevNote, type: type, state: 'add', info: { ...prevNote.info, todos: prevNote.info.todos || [] } }))
    }, [type])

    function onSaveNote(ev) {

        ev.preventDefault();

        if (!noteToEdit.info.title.trim() && !noteToEdit.info.txt.trim() && type === 'txt') return setIsEdit()

        noteService.save(noteToEdit)
            .then(savedNote => {
                callBack.addNote(savedNote)
                //show successMsg
                setIsEdit()
            })
            .catch(err => console.log(err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        if (field === 'img') {
            setIsUploadingFile(true)
            value = target.files[0]
            const reader = new FileReader()
            reader.onload = () => {
                setNoteToEdit(prevNote => ({
                    ...prevNote,
                    type: 'img',
                    info: {
                        ...prevNote.info,
                        img: value,
                        url: reader.result
                    }
                }))
                setTimeout(() => setIsUploadingFile(false), 500)
            }
            reader.readAsDataURL(value)
            return
        }

        if (field === 'video') {
            setIsUploadingFile(true)
            value = target.files[0]
            const reader = new FileReader()
            reader.onload = () => {
                setNoteToEdit(prevNote => ({
                    ...prevNote,
                    type: 'video',
                    info: {
                        ...prevNote.info,
                        img: value,
                        videoUrl: reader.result
                    }
                }))
                setTimeout(() => setIsUploadingFile(false), 500)
            }
            reader.readAsDataURL(value)
            return
        }

        if (field === 'txt') {
            target.style.height = 'auto'
            target.style.height = target.scrollHeight + "px";
        }
        setNoteToEdit(prevNote => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))

    }

    function handleTodoChange(index, newText) {
        setNoteToEdit(prevNote => {
            const newTodos = [...prevNote.info.todos || []]
            newTodos[index].txt = newText
            return { ...prevNote, info: { ...prevNote.info, todos: newTodos } }
        });
    }

    function toggleTodo(index) {
        setNoteToEdit(prevNote => {
            const newTodos = [...prevNote.info.todos || []]
            newTodos[index].isDone = !newTodos[index].isDone
            return { ...prevNote, info: { ...prevNote.info, todos: newTodos } }
        })
    }

    function addTodo() {
        setNoteToEdit(prevNote => ({
            ...prevNote,
            info: { ...prevNote.info, todos: [...(prevNote.info.todos || []), { text: "", isDone: false }] }
        }))
    }

    function removeTodo(index) {
        setNoteToEdit(prevNote => {
            const newTodos = (prevNote.info.todos || []).filter((_, i) => i !== index);
            return { ...prevNote, info: { ...prevNote.info, todos: newTodos } };
        });
    }

    const { title = '', txt = '', url, videoUrl, todos = [] } = noteToEdit.info || {};
    return (
        <section style={{ backgroundColor: noteToEdit.style.backgroundColor || 'white' }} className="note-edit" >

            {url && type === 'img' && <img src={url} alt="Preview" style={{ width: '100%', height: 'auto' }} />}
            {videoUrl && type === 'video' && (
                <video controls style={{ width: '100%', height: 'auto' }}>
                    <source src={videoUrl} type="video/mp4" />
                    <source src={videoUrl} type="video/webm" />
                    <source src={videoUrl} type="video/ogg" />
                </video>
            )}


            <form ref={formRef} onBlur={handleBlur} onSubmit={onSaveNote} >

                {(type === 'img' || type === 'video') && (
                    <input
                        ref={fileRef}
                        type="file"
                        accept={type === 'img' ? "image/*" : "video/*"} // תמיכה בסוגים שונים
                        name={type}
                        style={{ display: 'none' }}
                        onChange={handleChange}
                    />
                )}

                {type === 'todos' && (
                    <div className="todos-container">
                        {todos.map((todo, index) => (
                            <div key={index} className="todo-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <button
                                    type="button"
                                    onClick={() => toggleTodo(index)}
                                    style={{ cursor: 'pointer', fontSize: '18px' }}
                                >
                                    {todo.isDone ? "☑" : "⬜"}
                                </button>
                                <input
                                    type="txt"
                                    value={todo.txt}
                                    onChange={(e) => handleTodoChange(index, e.target.value)}
                                    placeholder="New todo..."
                                    style={{ border: 'none', outline: 'none', flex: '1', fontSize: '16px' }}
                                />
                                <button
                                    type="button"  // ✅ מונע שליחת הטופס
                                    onClick={() => removeTodo(index)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}
                                >
                                    X
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"  // ✅ מונע שליחת הטופס
                            onClick={addTodo}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', marginTop: '8px' }}
                        >
                            + Add Todo
                        </button>


                    </div>
                )}


                <input
                    placeholder='Title'
                    className='title'
                    onChange={handleChange}
                    value={title} type="text"
                    name="title"
                    id="title" />

                {type !== 'todos' && (
                    <textarea
                        ref={txtRef}
                        autoFocus
                        className='txt'
                        placeholder='Take a note...'
                        onChange={handleChange}
                        value={txt}
                        name="txt"
                        id="txt"
                    ></textarea>
                )}

                <section className="flex">
                    <ActionBtns note={noteToEdit} callBack={callBack} />
                    <button className="close-btn" type="submit">Close</button>
                </section>
            </form>
        </ section>
    )
}