export function MailPreview({ mail, onRemoveMail, onMailClick, onToggleStarred }) {

    const { subject, from, to, body, isStarred } = mail
    return (
        <tr className="mail-preview-row flex" onClick={() => onMailClick(mail.id)}>
            <td className="mail-preview-select">
                <button className="select-btn mail-action-btn flex align-center">
                    <img src="assets/img/check-box-outline.svg" alt="checkbox" />
                </button>
            </td>
            <td className="mail-preview-star">
                <button className="star-btn mail-action-btn flex align-center"
                    onClick={(event) => {
                        event.stopPropagation()
                        onToggleStarred(mail.id)
                    }}>
                    <img src={`assets/img/sidebar_icons/star-icon${isStarred ? '-fill' : ''}.svg`} alt="star icon" />
                </button>
            </td>
            <td className="mail-preview-important">
                <button className="important-btn mail-action-btn flex align-center">
                    <img src="assets/img/sidebar_icons/important-icon.svg" alt="star icon" />
                </button>
            </td>
            <td className="mail-preview-sender flex align-center">{from}</td>
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
