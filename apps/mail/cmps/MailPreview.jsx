export function MailPreview({ mail, onMailClick, onToggleStarred }) {

    const { subject, from, body, isStarred } = mail
    const senderName = from.split('@')[0]

    return (
        <tr className="mail-preview-row flex" onClick={() => onMailClick(mail.id)}>
            <td className="mail-preview-select">
                <button className="select-btn flex align-center">
                    <span className="mail-action-wrap">
                        <img src="assets/img/check-box-outline.svg" alt="checkbox" />
                    </span>
                </button>
            </td>
            <td className="mail-preview-star">
                <button className="star-btn flex align-center"
                    onClick={(event) => {
                        event.stopPropagation()
                        onToggleStarred(mail.id)
                    }}>
                    <span className="mail-action-wrap">
                        <img src={`assets/img/sidebar_icons/star-icon${isStarred ? '-fill' : ''}.svg`} alt="star icon" />
                    </span>                
                </button>
            </td>
            <td className="mail-preview-important">
                <button className="important-btn flex align-center">
                    <span className="mail-action-wrap">
                        <img src="assets/img/sidebar_icons/important-icon.svg" alt="star icon" />
                    </span>
                </button>
            </td>
            <td className="mail-preview-sender flex align-center">{senderName}</td>
            <td className="mail-preview-content flex align-center">
                <div className="mail-info flex align-center">
                    <div className="mail-subject-container">
                        <span className="mail-subject">{subject}</span>
                    </div>
                    <span className="mail-body"><span> - </span>{body}</span>
                </div>
            </td>
        </tr>
    )
}

{/* <td className="mail-preview-action" onClick={() => onRemoveMail(mail.id)}>X</td> */ }
