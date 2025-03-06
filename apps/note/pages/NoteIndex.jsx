import { noteService } from '../services/note.service.js'
import { utilService } from '../../../services/util.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { KeepHeader } from '../cmps/KeepHeader.jsx'
import { KeepNav } from '../cmps/KeepNav.jsx'
import { showErrorMsg } from '../../../services/event-bus.service.js'
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

    const callBack = {
        remove: onRemoveNote,
        color: onChangeColor,
        copy: onCopy,
        archived: onArchived,
        onPin: onPin,
        toggleTodo: onTodoToggle,
        addImg: onAddImg,
        addVideo: onAddVideo,
        addNote: onAddNote,
        restore: onRestoreNote
    }

    function onAddImg(noteId, url) {
        noteService.get(noteId)
            .then((note) => {
                if (note.info.url === url) return

                let txt = note.info.txt ? note.info.txt : '';
                let title = note.info.title ? note.info.title : '';


                const updatedNote = { ...note, type: 'img', info: { url, txt, title } }
                return noteService.save(updatedNote)
            })
            .then((updatedNote) => {
                setNotes(notes =>
                    notes.map(note => note.id === noteId ? updatedNote : note)
                )
            })
            .catch(err => {
                console.log('Problems adding image:', err);
            })
    }

    function onAddVideo(noteId, videoUrl) {
        noteService.get(noteId)
            .then((note) => {
                if (note.info.videoUrl === videoUrl) return;

                let txt = note.info.txt ? note.info.txt : '';
                let title = note.info.title ? note.info.title : '';

                const updatedNote = { ...note, type: 'video', info: { videoUrl, txt, title } }

                return noteService.save(updatedNote);
            })
            .then((updatedNote) => {
                setNotes(notes =>
                    notes.map(note => note.id === noteId ? updatedNote : note)
                );
            })
            .catch(err => {
                console.log('Problems adding video:', err)
                showErrorMsg('File too big')
            })
    }

    function onTodoToggle(noteId, todoIdx) {
        noteService.get(noteId)
            .then((note) => {
                note.info.todos[todoIdx].isDone = !note.info.todos[todoIdx].isDone
                noteService.save(note)
            })
            .then(() => {
                setNotes(notes =>
                    notes.map(note => note.id === noteId ? { ...note, info: { ...note.info, todos: note.info.todos.map((todo, idx) => idx === todoIdx ? { ...todo, isDone: !todo.isDone } : todo) } } : note)
                )
            })
            .catch(err => {
                console.log('Problems marking todo:', err)
            })
    }

    function onRemoveNote(noteId) {
        if (filterBy.side === 'deleted') {
            noteService.remove(noteId)
                .then(() => {
                    setNotes(notes =>
                        notes.filter(note => note.id !== noteId)
                    )
                })
                .catch(err => {
                    console.log('Problems removing note:', err)
                })
            return
        }
        noteService.get(noteId)
            .then((note) => {

                const updatedNote = { ...note, state: 'deleted' }
                noteService.save(updatedNote)
            })
            .then(() => {
                setNotes(notes =>
                    notes.filter(note => note.id !== noteId)
                )
            })
            .catch(err => {
                console.log('Problems removing note:', err)
            })
    }

    function onChangeColor(noteId, color) {
        noteService.get(noteId)
            .then((note) => {
                const updatedNote = { ...note, style: { backgroundColor: color } }
                noteService.save(updatedNote)
            }
            )
            .then(() => {
                setNotes(notes =>
                    notes.map(note => note.id === noteId ? { ...note, style: { backgroundColor: color } } : note)
                )
            })
            .catch(err => {
                console.log('Problem changing color:', err)
            })
    }

    function onCopy(noteId) {
        noteService.get(noteId)
            .then((note) => {
                noteService.save({ ...note, id: null })
                    .then(savedNote => {
                        setNotes([...notes, savedNote])
                    })
            })
            .catch(err => {
                console.log('Problems copying note:', err)
            })
    }

    function onArchived(noteId) {
        noteService.get(noteId)
            .then((note) => {
                note.state = 'archived'
                noteService.save(note)
            })
            .then(() => {
                setNotes(notes =>
                    notes.filter(note => note.id !== noteId)
                )
            })

    }



    function onPin(noteId) {
        noteService.get(noteId)
            .then((note) => {
                const updatedNote = { ...note, isPinned: !note.isPinned }
                noteService.save(updatedNote)
            })
            .then(() => {
                setNotes(notes =>
                    notes.map(note => note.id === noteId ? { ...note, isPinned: !note.isPinned } : note)
                )
            })
            .catch(err => {
                console.log('Problems pinning note:', err)
            })
    }

    function onRestoreNote(noteId) {

        noteService.get(noteId)
            .then((note) => {
                const updatedNote = { ...note, state: 'active' }
                noteService.save(updatedNote)
            }).then(() => {
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

    if (!notes) return <div class="loader-container">
        <div class="loader"></div>
    </div>

    return <section className="note-index note-reset main-layout">
        <KeepHeader filterBy={filterBy} onSetFilter={onSetFilter} />
        <KeepNav filterBy={setFilterBy} onSetFilter={onSetFilter} />
        <main>
            <NoteList callBack={callBack} filterBy={filterBy} onAddNote={onAddNote} notes={notes} /></main>
    </section>
}
