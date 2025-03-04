import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails, onMailClick, onToggleStarred }) {
    return (
        <table className="mail-list">
            <tbody>
                {mails.map(mail =>
                    <MailPreview key={mail.id} mail={mail} onMailClick={onMailClick}  onToggleStarred={onToggleStarred}/>)
                }
            </tbody>
        </table>
    )
}
