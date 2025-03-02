import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { KeepHeader } from '../cmps/KeepHeadr.jsx'
import { KeepNav } from '../cmps/KeepNav.jsx'

const { useEffect, useState } = React

export function NoteIndex() {

    const [notes, setNotes] = useState(null)


    useEffect(() => {
        noteService.query()
            .then(setNotes)

    }, [])

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(notes =>
                    notes.filter(note => note.id !== noteId)
                )
            })
            .catch(err => {
                console.log('Problems removing note:', err)
            })
    }


    if (!notes) return <div>loading</div>

    return <section className="note-index main-layout">
        <KeepHeader />
        <KeepNav />

        <NoteList onRemoveNote={onRemoveNote} notes={notes} />
    </section>
}
