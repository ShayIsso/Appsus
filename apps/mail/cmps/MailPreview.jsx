import { utilService } from '../../../services/util.service.js'

const { useState } = React

export function MailPreview({ mail, onMailClick, onToggleStatus }) {
    const [isSelect, setIsSelect] = useState(false)

    const { subject, from, body, isStarred, isRead, isImportant, sentAt } = mail
    const senderName = from.split('@')[0]
    const dayNumber = utilService.getDayNumber(sentAt)
    const monthInShort = utilService.getMonthName(new Date(sentAt)).slice(0, 3)

    const handleSelectToggle = (event) => {
        event.stopPropagation()
        setIsSelect(!isSelect)
    }

    return (
        <tr className={`mail-preview-row flex ${isRead ? 'read' : ''} ${isSelect ? 'select' : ''}`}
            onClick={() => onMailClick(mail.id)}>
            <td className="mail-preview-select">
                <button className="select-btn flex align-center"
                    onClick={handleSelectToggle}>
                    <span className="mail-action-wrap">
                        <img src={`assets/img/check-box-outline${isSelect ? '-select' : ''}.svg`} alt="checkbox" />
                    </span>
                </button>
            </td>
            <td className="mail-preview-star">
                <button className="star-btn flex align-center"
                    onClick={(event) => {
                        event.stopPropagation()
                        onToggleStatus(mail.id, 'isStarred')
                    }}>
                    <span className="mail-action-wrap">
                        <img src={`assets/img/sidebar_icons/star-icon${isStarred ? '-fill' : ''}.svg`} alt="star icon" />
                    </span>
                </button>
            </td>
            <td className="mail-preview-important">
                <button className="important-btn flex align-center"
                    onClick={(event) => {
                        event.stopPropagation()
                        onToggleStatus(mail.id, 'isImportant')
                    }}>
                    <span className="mail-action-wrap">
                        <img src={`assets/img/sidebar_icons/important-icon${isImportant ? '-fill' : ''}.svg`} alt="important icon" />
                    </span>
                </button>
            </td>
            <td className="mail-preview-sender flex align-center" style={{ fontWeight: isRead ? 'bold' : 'normal' }}>{senderName}</td>
            <td className="mail-preview-content flex align-center">
                <div className="mail-info flex align-center">
                    <div className="mail-subject-container">
                        <span className="mail-subject" style={{ fontWeight: isRead ? 'bold' : 'normal' }}>{subject}</span>
                    </div>
                    <span className="mail-body"><span> - </span>{body}</span>
                </div>
            </td>
            <td className="mail-preview-date flex align-center">
                <span>{`${monthInShort} ${dayNumber}`}</span>
            </td>
        </tr>
    )
}

{/* <td className="mail-preview-action" onClick={() => onRemoveMail(mail.id)}>X</td> */ }
