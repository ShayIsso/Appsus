const { useState, useEffect, useRef } = React

import { noteService } from "../services/note.service.js";
import { NoteActionBtns } from "./NoteActionBtns.jsx";


//לעשות שהטקסט ישאר באותו פורמט

export function NoteEdit({ onAddNote, setIsEdit }) {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const txtRef = useRef(null)

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
        <section onBlur={onSaveNote} className="note-edit">
            <form onSubmit={onSaveNote} >

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
                    <NoteActionBtns />
                    <button className="close-btn" type="submit">Close</button>
                </section>
            </form>
        </ section>
    )
}