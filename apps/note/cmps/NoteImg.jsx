import { NoteTxt } from './NoteTxt.jsx'
const { Link } = ReactRouterDOM

export function NoteImg({ note }) {
    const { info } = note
    return (
        <React.Fragment>
            <Link to={`/note/edit/${note.id}?type=${note.type}`}>

                {<img src={note.info.url} alt={info.title} />}
                <NoteTxt note={note} />
            </Link>
        </React.Fragment>
    )
}