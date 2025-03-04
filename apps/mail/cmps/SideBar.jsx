export function SideBar({ onComposeClick }) {
    return (
        <aside className="sidebar">
            <div className="sidebar-content flex">
                {/* Compose button */}
                <div className="compose-div">
                    <div className="compose-btn-container">
                        <button
                            onClick={onComposeClick}
                            className="compose-icon-btn flex align-center justify-center">
                            <img src="assets/img/edit-icon.svg" alt="compose icon" />
                            <span className="compose-text">Compose</span>
                        </button>
                    </div>
                </div>

                <div className="sidebar-menu flex">
                    {/* Menu items */}
                    <div className="sidebar-icon flex align-center active">
                        <button className="icon-btn flex align-center justify-center">
                            <img src="assets/img/sidebar_icons/inbox-icon.svg" alt="inbox icon" />
                        </button>
                        <span className="sidebar-icon-text">Inbox</span>
                        <span className="unread-count">12</span>
                    </div>
                    <div className="sidebar-icon flex align-center">
                        <button className="icon-btn flex align-center justify-center">
                            <img src="assets/img/sidebar_icons/star-icon.svg" alt="star icon" />
                        </button>
                        <span className="sidebar-icon-text">Starred</span>
                    </div>
                    <div className="sidebar-icon flex align-center">
                        <button className="icon-btn flex align-center justify-center">
                            <img src="assets/img/sidebar_icons/snooze-icon.svg" alt="snooze icon" />
                        </button>
                        <span className="sidebar-icon-text">Snoozed</span>
                    </div>
                    <div className="sidebar-icon flex align-center">
                        <button className="icon-btn flex align-center justify-center">
                            <img src="assets/img/sidebar_icons/important-icon.svg" alt="important icon" />
                        </button>
                        <span className="sidebar-icon-text">Important</span>
                    </div>
                    <div className="sidebar-icon flex align-center">
                        <button className="icon-btn flex align-center justify-center">
                            <img src="assets/img/sidebar_icons/send-icon.svg" alt="send icon" />
                        </button>
                        <span className="sidebar-icon-text">Sent</span>
                    </div>
                    <div className="sidebar-icon flex align-center">
                        <button className="icon-btn flex align-center justify-center">
                            <img src="assets/img/sidebar_icons/draft-icon.svg" alt="draft icon" />
                        </button>
                        <span className="sidebar-icon-text">Drafts</span>
                    </div>
                    <div className="sidebar-icon flex align-center">
                        <button className="icon-btn flex align-center justify-center">
                            <img src="assets/img/sidebar_icons/label-icon.svg" alt="label icon" />
                        </button>
                        <span className="sidebar-icon-text">Categories</span>
                    </div>
                    <div className="sidebar-icon flex align-center">
                        <button className="icon-btn flex align-center justify-center">
                            <img src="assets/img/sidebar_icons/more-icon.svg" alt="more icon" />
                        </button>
                        <span className="sidebar-icon-text">More</span>
                    </div>
                </div>
            </div>
        </aside>
    )
}