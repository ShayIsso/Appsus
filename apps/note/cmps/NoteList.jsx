import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes, onRemoveNote }) {

    return (
<ul>
    {notes.map(note => 
     <li key={note.id}>
        <NotePreview key={note.id} note={note} />
        <section>
            <button onClick={() => onRemoveNote(note.id)}>x</button>
        </section>
        </li>

)}
</ul>

    )
    
}
