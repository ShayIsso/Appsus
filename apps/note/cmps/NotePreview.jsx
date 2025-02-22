
export function NotePreview({ note }) {
    const { type } = note
    return (
        <li key={note.id}>{type}</li>
    )
}