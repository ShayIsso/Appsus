const { useState } = React

export function MailFilter({ filterBy, onSetFilterBy }) {
    const [editFilterBy, setEditFilterBy] = useState({ ...filterBy })

    function onSetEditFilterBy(ev) {
        const { value, name } = ev.target;
        setEditFilterBy(prev => ({ ...prev, [name]: value }))
    }

    function onSearch(ev) {
        ev.preventDefault()
        onSetFilterBy(editFilterBy)
    }


    return (
        <section className="search-container">
            <form className="search-bar" onSubmit={onSearch}>
                <button type="submit" className="search-icon-btn">
                    <img src="assets/img/search-icon.svg" alt="search icon" />
                </button>
                <input className="search-input" 
                       type="text" 
                       placeholder="Search mail" 
                       name="txt"
                       value={editFilterBy.txt} 
                       onChange={onSetEditFilterBy} 
                       aria-label="Search mail" 
                       spellCheck="false" 
                       autoComplete="off" />
                <div className="search-tools">
                    <button type="button" aria-label="Search options">
                        <img src="assets/img/search-options.svg" alt="search options" />
                    </button>
                </div>
            </form>
        </section>
    )
}