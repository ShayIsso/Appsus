export function SideBar({ isOpen, onComposeClick, onSetFilterStatus, currentStatus, unreadCounts }) {
    const sidebarItems = [
        { id: 'inbox', label: 'Inbox', icon: 'inbox-icon', unreadCount: unreadCounts.inbox },
        { id: 'star', label: 'Starred', icon: 'star-icon', unreadCount: unreadCounts.star },
        { id: 'snoozed', label: 'Snoozed', icon: 'snooze-icon' },
        { id: 'important', label: 'Important', icon: 'important-icon', unreadCount: unreadCounts.important },
        { id: 'sent', label: 'Sent', icon: 'send-icon', unreadCount: unreadCounts.sent },
        { id: 'draft', label: 'Drafts', icon: 'draft-icon', unreadCount: unreadCounts.draft },
        { id: 'trash', label: 'Trash', icon: 'delete-icon', unreadCount: unreadCounts.trash },
    ]

    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-content flex">
                <div className="compose-div">
                    <div className="compose-btn-container">
                        <button onClick={onComposeClick} className="compose-icon-btn flex align-center justify-center">
                            <img src="assets/img/edit-icon.svg" alt="compose icon" />
                            <span className="compose-text">Compose</span>
                        </button>
                    </div>
                </div>

                <div className="sidebar-menu flex">
                    {sidebarItems.map(item => {
                        const isActive = currentStatus === item.id
                        const iconPath = `assets/img/sidebar_icons/${item.icon}${isActive ? '-full' : ''}.svg`
                        return (
                            <div 
                                key={item.id}
                                className={`sidebar-icon flex align-center ${isActive ? 'active' : ''}`}
                                onClick={() => onSetFilterStatus(item.id)}
                            >
                                <button className="icon-btn flex align-center justify-center">
                                    <img src={iconPath} alt={`${item.label} icon`} />
                                </button>
                                <span className="sidebar-icon-text">{item.label}</span>
                                {item.unreadCount > 0 && <span className="unread-count">{item.unreadCount}</span>}
                            </div>
                        )
                    })}
                </div>
            </div>
        </aside>
    )
}
