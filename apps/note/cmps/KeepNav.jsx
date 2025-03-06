
const { NavLink } = ReactRouterDOM
const { useState, useEffect, useRef } = React


export function KeepNav({ filter, onSetFilter }) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)


    return (
        <nav className="keep-nav flex column ">
            <button style={{
                position: 'absolute', top: '12px', left: '16px', padding: '10px'
            }}
                onClick={() => setIsMenuOpen(true)}
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}

            >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#656565"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>
            </button>

            <NavLink className={`${isMenuOpen && 'open'}` + " Notes"} to="/note"
                onClick={() => { onSetFilter({ side: '' }) }}
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5F6368"><path d="M313.3-233.07v-131.91q-57.71-40.43-89.57-102.39-31.86-61.96-31.86-132.39 0-120.35 83.86-204.36 83.85-84.01 204.24-84.01 120.38 0 204.27 83.87Q768.13-720.4 768.13-600q0 70.39-31.86 132.11-31.86 61.72-89.57 102.91v131.91H313.3Zm90.77-90.76h151.86v-88.65l36.64-25.67q40.28-27.52 62.54-70.45 22.26-42.93 22.26-91.29 0-81.91-57.73-139.7-57.73-57.78-139.64-57.78t-139.64 57.73Q282.63-681.91 282.63-600q0 48.52 22.38 91.3 22.38 42.79 62.66 70.55l36.4 25.67v88.65ZM353.78-71.87v-90.76h252.44v90.76H353.78ZM480-600Z" /></svg>
                {isMenuOpen && <span>Notes</span>}

            </NavLink >

            <NavLink className={`${isMenuOpen && 'open'}` + " Archive"} to="/archived"
                onClick={() => onSetFilter({ side: 'archived' })}
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5F6368"><path d="m480-242.87 160.48-160.48-60.07-60.54-57.3 57.3v-151.74h-86.22v151.74l-57.3-57.06-60.07 60.54L480-242.87ZM202.87-628.76v425.89h554.26v-425.89H202.87Zm-91 516.89V-723.7L216.3-848.13h527.4L848.13-723.7v611.83H111.87Zm112.5-605.5h511.26l-34-40H258.37l-34 40ZM480-415.93Z" /></svg>
                {isMenuOpen && <span>Archive</span>}
            </NavLink>

            <NavLink className={`${isMenuOpen && 'open'}` + " Trash"} to="/trash"
                onClick={() => onSetFilter({ side: 'deleted' })}
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}

            >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5F6368"><path d="M186.37-111.87v-605.5h-45.5v-91H354.5v-45.5h250.52v45.5h214.11v91h-45.5v605.5H186.37Zm91-91h405.26v-514.5H277.37v514.5Zm78.33-77.37h85.5v-360h-85.5v360Zm163.1 0h85.5v-360h-85.5v360ZM277.37-717.37v514.5-514.5Z" /></svg>
                {isMenuOpen && <span>Trash</span>}
            </NavLink>

        </nav >
    )
}