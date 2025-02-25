
export function NotePreview({ note, onRemoveNote }) {
    const { title,txt } = note.info
    return (
        <section className="note-preview"> 
            <h1>{title}</h1>
            <p>{txt}</p>
            <section >
            <button onClick={() => onRemoveNote(note.id)}>x</button>
        </section>
        </section>
    )
}