import { NotePreview } from './NotePreview.jsx'
import { EditButton } from './EditButton.jsx'
import { NoteEdit } from './NoteEdit.jsx'


const { useState } = React
export function NoteList({ notes, callBack, filterBy }) {
    const [isEdit, setIsEdit] = useState(false)
    const [type, setType] = useState('txt')


    function handleEdit(type) {
        setType(type)
        setIsEdit(true)

    }

    if (!notes) return <div class="loader-container">
        <div class="loader"></div>
    </div>

    return (
        <div className="notes-container flex column" >

            {filterBy.side === '' && < section className="edit-container"  >
                {isEdit ? <NoteEdit type={type} callBack={callBack} setIsEdit={() => setIsEdit(false)} /> : <EditButton handleEdit={handleEdit} />
                }
            </section >}

            <section className='note-list'>
                {notes.filter(note => note.isPinned).map(note =>
                    <div key={note.id}>
                        <NotePreview key={note.id} callBack={callBack} note={note} />
                    </div>
                )}
            </section>

            <section className="note-list">
                {notes.map(note =>
                    !note.isPinned &&
                    <div key={note.id}>
                        <NotePreview key={note.id} callBack={callBack} note={note} />
                    </div>
                )}
            </section>

        </div >
    )
}
