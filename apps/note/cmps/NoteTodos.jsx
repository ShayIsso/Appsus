const { Link } = ReactRouterDOM

export function NoteTodos({ note, onChangeInfo }) {

    const { title, todos } = note.info

    return (
        <React.Fragment>

            <Link to={`/note/edit/${note.id}?type=${note.type}`}> <h2 className="title">{title}</h2></Link>
            <ul className="todos">
                {note.type === 'todos' && todos.map((todo, idx) => {
                    return <li style={{
                        overflowWrap: 'anywhere'
                    }} key={idx} className={todo.isDone ? 'done' : ''} onClick={() => {
                        onChangeInfo(note.id, idx)
                    }}>{todo.txt}</li>
                })}
            </ul>


        </React.Fragment >
    )
}