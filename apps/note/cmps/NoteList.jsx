import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes }) {

    return (
<ul>
    {notes.map(note => 
        <NotePreview key={note.id} note={note} />

)}
</ul>

    )
    
}
