

export function DropMenu({ options }) {

    return (
        <div className="drop-menu flex column">
            {options.map(option =>
                <div key={option.id} onClick={option.function}>{option.name}</div>
            )}

        </div>
    )

}