const { useParams } = ReactRouterDOM
const { useState, useEffect } = React

import { noteService } from "../services/note.service.js";

export function NoteEdit({ onAddNote }) {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(noteToEdit)
            .then(savedNote => {
                onAddNote(savedNote)
                //show successMsg
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

                <input onChange={handleChange} value={title} type="text" name="title" id="title" />

                <input onChange={handleChange} value={txt} type="text" name="txt" id="txt" />

                <button>Close</button>
            </form>

        </ section>
    )
}