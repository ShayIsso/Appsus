const { Link } = ReactRouterDOM
import { NoteActionBtns } from './NoteActionBtns.jsx'



export function NotePreview({ note, onRemoveNote }) {


    const options = [
        {
            name: 'Delete',
            id: 1,
            function: () => onRemoveNote(note.id)

        },
        {
            name: 'test',
            id: 2,
        }
    ]



    const { title, txt } = note.info
    return (
        <section className="note-preview">

            <button className="n-pin-btn"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#757575"><path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z" /></svg></button>

            <Link to={`/note/${note.id}`} >
                <p>{txt}</p>
            </Link>

            <NoteActionBtns options={options} />

        </section>
    )
}
