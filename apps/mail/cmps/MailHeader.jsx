export function MailHeader() {
    return (
        <header className="mail-header flex">
            <section className="header-logo-section flex align-center">
                <div className="hamburger">
                    <svg focusable="false" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
                </div>
                <img className="gmail-logo" src="assets/img/full_logo_gmail.png" alt="gmail logo" />
            </section>
            <section className="search-container">
                <div className="search-bar">
                    <button className="search-icon-btn">
                        <img src="assets/img/search-icon.svg" alt="search icon" />
                    </button>
                    <input className="search-input" type="text" placeholder="Search mail" aria-label="Search mail" />
                    <div className="search-tools">
                        <button type="button" aria-label="Search options">
                            <img src="assets/img/search-options.svg" alt="search options" />
                        </button>
                    </div>
                </div>
            </section>
            <div className="options-btns flex align-center">
                <button className="help-icon-btn">
                    <img src="assets/img/help-icon.svg" alt="search icon" />
                </button>
                <button className="settings-btn">
                    <img src="assets/img/settings.svg" alt="search icon" />
                </button>
            </div>
            <div className="apps-user-container flex align-center">
                <button className="gog-apps-btn">
                    <img src="assets/img/gog-apps.svg" alt="google apps" />
                </button>
                    <span className="user-img">
                        <img src="assets/img/user-img.png" alt="user-img" />
                    </span>
            </div>
        </header>
    )
}