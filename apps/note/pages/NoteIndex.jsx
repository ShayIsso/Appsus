import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { KeepHeader } from '../cmps/KeepHeadr.jsx'
import { KeepNav } from '../cmps/KeepNav.jsx'
const { useEffect, useState } = React
const { useSearchParams } = ReactRouterDOM


export function NoteIndex() {

    const [searchParams, setSearchParams] = useSearchParams()


    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(noteService.getFilterFromSearchParams(searchParams))


    useEffect(() => {

        setSearchParams(filterBy)

        noteService.query(filterBy)
            .then(setNotes)

    }, [filterBy])



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

    function onAddNote(savedNote) {
        setNotes([...notes, savedNote])
    }

    function onSetFilter(filterBy) {
        setFilterBy({ ...filterBy })
    }

    if (!notes) return <div>loading</div>

    return <section className="note-index note-reset main-layout">
        <KeepHeader filterBy={filterBy} onSetFilter={onSetFilter} />
        <KeepNav />

        <NoteList onAddNote={onAddNote} onRemoveNote={onRemoveNote} notes={notes} />
    </section>
}
