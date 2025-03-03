const { Link } = ReactRouterDOM
import { noteService } from '../services/note.service.js'
import { KeepHeader } from '../cmps/KeepHeadr.jsx'
import { KeepNav } from '../cmps/KeepNav.jsx'
const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect, useRef } = React

import { NoteActionBtns } from "../cmps/NoteActionBtns.jsx";

export function NoteEditPage() {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()
    const { noteId } = useParams()

    useEffect(() => {
        if (noteId) loadNote()

    }, [])

    function loadNote() {
        noteService.get(noteId)
            .then(setNoteToEdit)
            .catch(err => console.log('err:', err))
    }


    function onSaveNote(ev) {
        ev.preventDefault()

        if (!noteToEdit.info.title.trim() && !noteToEdit.info.txt.trim()) return setIsEdit()

        noteService.save(noteToEdit)
            .then(savedNote => {
                navigate('/note')
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
        <section className="note-reset main-layout">
            <KeepHeader />
            <KeepNav />

            <Link to="/note" >
                <div className="dark-screen" style={{ opacity: 1 }}></div>
            </Link>

            <div className="edit-container edit-layout">
                <section className="note-edit">
                    <form onSubmit={onSaveNote}>

                        <input
                            placeholder='Title'
                            className='title'
                            onChange={handleChange}
                            value={title} type="text"
                            name="title"
                            id="title" />

                        <textarea
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
            </div>
        </section>
    )
}