
export function NotePreview({ note }) {
    const { type } = note
    return (
        <section>
            <h1>{type}</h1>
        </section>
    )
}