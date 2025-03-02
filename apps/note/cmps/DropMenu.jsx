

export function DropMenu({ onRemoveNote, noteId }) {

    return (
        <div className="drop-menu flex column">
            <div onClick={() => onRemoveNote(noteId)}>Delete Note</div>
            <div>Delete Note</div>
            <div>Add label</div>
            <div>Share in     Email</div>
        </div>
    )

}