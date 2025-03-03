import { NotePreview } from './NotePreview.jsx'
import { EditButton } from './EditButton.jsx'
import { NoteEdit } from './NoteEdit.jsx'


const { useState } = React
export function NoteList({ notes, onRemoveNote, onAddNote }) {

    const [isEdit, setIsEdit] = useState(false)

    return (
        <div className="notes-container flex column" >

            < section className="edit-container" >
                {isEdit ? <NoteEdit onAddNote={onAddNote} setIsEdit={() => setIsEdit(false)} /> : <EditButton setIsEdit={() => setIsEdit(true)} />}
            </section >

            <section className="note-list">
                {notes.map(note =>
                    <div key={note.id}>
                        <NotePreview onRemoveNote={onRemoveNote} key={note.id} note={note} />
                    </div>
                )}
            </section>

        </div >
    )
}
