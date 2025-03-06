import { NoteActionBtns } from './NoteActionBtns.jsx'
import { ActionBtns } from './ActionBtns.jsx'
const { useRef, useEffect, useState } = React
import { noteService } from '../services/note.service.js'
import { DynamicPre } from './DynamicPre.jsx'

export function NotePreview({ note, callBack }) {

    const [cmpType, setCmpType] = useState(note.type)
    useEffect(() => {
        setCmpType(note.type)
    }, [note.type])

    return (
        <section style={{ backgroundColor: note.style.backgroundColor }} className="note-preview">

            <button onClick={() => callBack.onPin(note.id)} className={`n-pin-btn ${note.isPinned && 'pinned'}`}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#656565"><path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Z" /></svg></button>

            <DynamicPre cmpType={cmpType} note={note} onChangeInfo={callBack} />

            <ActionBtns note={note} callBack={callBack} />

        </section>
    )
}
