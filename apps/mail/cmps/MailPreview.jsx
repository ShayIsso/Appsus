const { Link } = ReactRouterDOM

export function MailPreview({ mail, onRemoveMail }) {

    const { subject, from, to, body } = mail
    return (
        <tr className="mail-preview-row flex">
            <td className="mail-preview-select">
                <button className="select-btn flex align-center">
                    <img src="assets/img/check-box-outline.svg" alt="checkbox" />
                </button>
            </td>
            <td className="mail-preview-star">
                <button className="star-btn flex align-center">
                    <img src="assets/img/sidebar_icons/star-icon.svg" alt="star icon" />
                </button>
            </td>
            <td className="mail-preview-important">
                <button className="important-btn flex align-center">
                    <img src="assets/img/sidebar_icons/important-icon.svg" alt="star icon" />
                </button>
            </td>
            <td className="mail-preview-sender flex align-center">{from}</td>
            <td className="mail-preview-content flex align-center">
                <div className="mail-info flex align-center">
                    <div className="mail-subject-container">
                        <span className="mail-subject">{subject}</span>
                    </div>
                    <span className="mail-body">{body}</span>
                </div>
            </td>
            <td className="mail-preview-link"><Link to={`/mail/${mail.id}`}>Details</Link></td>
        </tr>
    )
}

{/* <td className="mail-preview-action" onClick={() => onRemoveMail(mail.id)}>X</td> */ }
