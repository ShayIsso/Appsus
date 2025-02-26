export function SideBar() {
    return (
        <aside className="sidebar flex">
            <div className="compose-div">
                <div className="compose-container flex align-center">
                    <button className="compose-icon-btn flex align-center">
                        <img src="assets/img/edit-icon.svg" alt="search icon" />
                    </button>
                </div>
            </div>
            <div className="sidebar-icons">
                <div className="sidebar-icon">
                    <button className="icon-btn flex align-center">
                        <img src="assets/img/sidebar_icons/inbox-icon.svg" alt="inbox icon" />
                    </button>
                </div>
                <div className="sidebar-icon">
                    <button className="icon-btn flex align-center">
                        <img src="assets/img/sidebar_icons/star-icon.svg" alt="star icon" />
                    </button>
                </div>
                <div className="sidebar-icon">
                    <button className="icon-btn flex align-center">
                        <img src="assets/img/sidebar_icons/snooze-icon.svg" alt="snooze icon" />
                    </button>
                </div>
                <div className="sidebar-icon">
                    <button className="icon-btn flex align-center">
                        <img src="assets/img/sidebar_icons/important-icon.svg" alt="important icon" />
                    </button>
                </div>
                <div className="sidebar-icon">
                    <button className="icon-btn flex align-center">
                        <img src="assets/img/sidebar_icons/send-icon.svg" alt="send icon" />
                    </button>
                </div>
                <div className="sidebar-icon">
                    <button className="icon-btn flex align-center">
                        <img src="assets/img/sidebar_icons/draft-icon.svg" alt="draft icon" />
                    </button>
                </div>
                <div className="sidebar-icon">
                    <button className="icon-btn flex align-center">
                        <img src="assets/img/sidebar_icons/label-icon.svg" alt="label icon" />
                    </button>
                </div>
            </div>
        </aside>
    )
}