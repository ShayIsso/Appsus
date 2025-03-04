const { useState, useEffect, useRef } = React

import { noteService } from "../services/note.service.js";
import { NoteActionBtns } from "./NoteActionBtns.jsx";

export function NoteEdit({ onAddNote, setIsEdit }) {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const [backgroundColor, setBackgroundColor] = useState('white')

    const txtRef = useRef(null)
    const formRef = useRef(null)

    function onSelectColor(color) {
        setBackgroundColor(color)
        setNoteToEdit(prevNote => ({ ...prevNote, style: { backgroundColor: color } }))
    }

    const handleBlur = (ev) => {
        if (formRef.current && !formRef.current.contains(ev.relatedTarget)) {
            onSaveNote(ev);
        }
    };

    useEffect(() => {
        if (txtRef.current) {
            txtRef.current.focus()
        }
    }, [])

    function onSaveNote(ev) {

        ev.preventDefault();

        if (!noteToEdit.info.title.trim() && !noteToEdit.info.txt.trim()) return setIsEdit()

        noteService.save(noteToEdit)
            .then(savedNote => {
                onAddNote(savedNote)
                //show successMsg
                setIsEdit()
            })
            .catch(err => console.log(err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        if (field === 'txt') {
            target.style.height = 'auto'
            target.style.height = target.scrollHeight + "px";
        }

        setNoteToEdit(prevNote => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
    }

    const { title, txt } = noteToEdit.info

    return (
        <section style={{ backgroundColor: backgroundColor }} className="note-edit" >
            <form ref={formRef} onBlur={handleBlur} onSubmit={onSaveNote} >

                <input
                    placeholder='Title'
                    className='title'
                    onChange={handleChange}
                    value={title} type="text"
                    name="title"
                    id="title" />

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

                <section className="flex">
                    <NoteActionBtns currColor={backgroundColor} onSelect={onSelectColor} />
                    <button className="close-btn" type="submit">Close</button>
                </section>
            </form>
        </ section>
    )
}