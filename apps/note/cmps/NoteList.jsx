import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes, onRemoveNote }) {

    return (
<section className="note-list">
    {notes.map(note => 
     <div key={note.id}>
        <NotePreview onRemoveNote={onRemoveNote} key={note.id} note={note} />
        </div>

)}
</section>

    )
    
}
