const { useState } = React

export function MailFilter({ filterBy, onSetFilterBy }) {
    const [editFilterBy, setEditFilterBy] = useState({ ...filterBy })

    function handleChange({ target }) {
        let { name, type, value, checked } = target
        if (type === 'number') value = +value
        if (type === 'checkbox') value = checked

        if (name === 'isRead') {
            switch (value) {
                case 'true':
                    value = true
                    break
                case 'false':
                    value = false
                    break
                case '':
                    value = ''
                    break
            }
        }
        const updatedFilter = { ...editFilterBy, [name]: value }
        setEditFilterBy(updatedFilter)

        if (name === 'isRead') {
            onSetFilterBy(updatedFilter)
        }
    }

    function onSearch(ev) {
        ev.preventDefault()
        onSetFilterBy(editFilterBy)
    }

    return (
        <section className="search-container flex align-center">
            <form className="search-bar" onSubmit={onSearch}>
                <button type="submit" className="search-icon-btn">
                    <img src="assets/img/search-icon.svg" alt="search icon" />
                </button>
                <input className="search-input"
                    type="text"
                    placeholder="Search mail"
                    name="txt"
                    value={editFilterBy.txt || ''}
                    onChange={handleChange}
                    aria-label="Search mail"
                    spellCheck="false"
                    autoComplete="off" />
                <div className="search-tools">
                    <button type="button" aria-label="Search options">
                        <img src="assets/img/search-options.svg" alt="search options" />
                    </button>
                </div>
            </form>
            <select
                className="mail-filter-select"
                name="isRead"
                id="isRead"
                value={editFilterBy.isRead === true ? 'true' : editFilterBy.isRead === false ? 'false' : ''}
                onChange={handleChange}>
                <option value="">All Mails</option>
                <option value="true">Read</option>
                <option value="false">Unread</option>
            </select>
        </section>
    )
}