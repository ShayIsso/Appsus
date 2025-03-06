import { NoteTxt } from './NoteTxt.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteImg } from './NoteImg.jsx'
import { NoteVideo } from './NoteVideo.jsx'
const { Link } = ReactRouterDOM


export function DynamicPre({ cmpType, note, onChangeInfo }) {




    switch (cmpType) {
        case 'txt':
            return <Link to={`/note/edit/${note.id}?type=${note.type}`}><NoteTxt note={note} /></Link>
        case 'todos':
            return <NoteTodos note={note} onChangeInfo={onChangeInfo.toggleTodo} />
        case 'img':
            return <NoteImg note={note} />
        case 'video':
            return <NoteVideo note={note} />
        default:
            return <NoteTxt note={note} />

    }
}