

export function EditButton({ handleEdit }) {

    return (
        <div className="edit-button flex space-between align-items justify-center">
            <h1 style={{ width: '100%' }} onClick={() => handleEdit('txt')}>Take a note...</h1>
            <section className="flex space-between align-items justify-center">
                <button onClick={() => handleEdit('todos')}><svg xmlns="http://www.w3.org/2000/svg" max-height="24px" viewBox="0 -960 960 960" width="24px" fill="#797979"><path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" /></svg></button>
                <button onClick={() => handleEdit('video')}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#797979"><path d="m384-312 264-168-264-168v336ZM168-192q-29.7 0-50.85-21.16Q96-234.32 96-264.04v-432.24Q96-726 117.15-747T168-768h624q29.7 0 50.85 21.16Q864-725.68 864-695.96v432.24Q864-234 842.85-213T792-192H168Zm0-72h624v-432H168v432Zm0 0v-432 432Z" /></svg></button>
                <button onClick={() => handleEdit('img')}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#797979"><path d="M240-280h480L570-480 450-320l-90-120-120 160ZM120-120v-720h720v720H120Zm80-80h560v-560H200v560Zm0 0v-560 560Z" /></svg></button>
            </section>
        </div>
    )
}