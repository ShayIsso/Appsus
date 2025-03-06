const { useState, useEffect } = React

export function DropMenu({ callBack, note }) {

    const [options, setOptions] = useState(getOptions(note.state))

    useEffect(() => {
        setOptions(getOptions(note.state))
    }, [note.state])

    function getOptions(state) {
        switch (state) {
            case 'active':
                return [{
                    name: 'Delete note',
                    function: () => callBack.remove(note.id)
                },
                {
                    name: 'Make a copy',
                    function: () => callBack.copy(note.id)
                }]
            case 'archived':
                return [{
                    name: 'Delete note',
                    function: () => callBack.remove(note.id)
                },
                {
                    name: 'Make a copy',
                    function: () => callBack.copy(note.id)
                }]
            default:
                return []
        }
    }



    return (
        <div className="drop-menu">
            {options.map((option, index) =>
                <div key={index} onClick={option.function}>{option.name}</div>
            )}
        </div>
    )

}