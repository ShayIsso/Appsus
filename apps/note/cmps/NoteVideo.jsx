import { NoteTxt } from './NoteTxt.jsx'
const { Link } = ReactRouterDOM

export function NoteVideo({ note }) {
    const { info } = note
    return (
        <React.Fragment>
            <iframe muted width="100%" height="auto" src={info.videoUrl}
                title={info.title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
            </iframe>
            <Link to={`/note/edit/${note.id}?type=${note.type}`}>
                <NoteTxt note={note} />
            </Link>
        </React.Fragment>
    )
}