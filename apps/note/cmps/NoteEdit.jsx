const { useParams } = ReactRouterDOM
const { useState, useEffect } = React

import { noteService } from "../services/note.service.js";
import { NoteActionBtns } from "./NoteActionBtns.jsx";

export function NoteEdit({ onAddNote, setIsEdit }) {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())

    function onSaveNote(ev) {
        ev.preventDefault()

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

        setNoteToEdit(prevNote => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
    }

    const { title, txt } = noteToEdit.info

    return (
        <section className="note-edit">
            <form onSubmit={onSaveNote}>

                <input placeholder='Title' className='title' onChange={handleChange} value={title} type="text" name="title" id="title" />

                {/* <input placeholder='Take a note...' className='txt' onChange={handleChange} value={txt} type="text" name="txt" id="txt" /> */}
                <textarea
                    className='txt'
                    placeholder='Take a note...'
                    onChange={handleChange}
                    value={txt}
                    name="txt"
                    id="txt"

                ></textarea>
                <section className="flex">
                    <NoteActionBtns /> <button className="close-btn" type="submit">Close</button>
                </section>
            </form>
        </ section>
    )
}