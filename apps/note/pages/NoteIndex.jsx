import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'

const { useEffect, useState } = React
export function NoteIndex() {

    const [notes, setNotes] = useState(null)

    useEffect(() => {
        noteService.query()
            .then(setNotes)

    }, [])

    if (!notes) return <div>loading</div>

    return <section>
        <NoteList notes={notes} />
    </section>
}
