import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails, onRemoveMail, onMailClick, onToggleStarred }) {
    return (
        <table className="mail-list">
            <tbody>
                {mails.map(mail =>
                    <MailPreview key={mail.id} mail={mail} onRemoveMail={onRemoveMail} onMailClick={onMailClick}  onToggleStarred={onToggleStarred}/>)
                }
            </tbody>
        </table>
    )
}
