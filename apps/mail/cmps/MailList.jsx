import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails, onRemoveMail, onMailClick }) {
    return (
        <table className="mail-list">
            <tbody>
                {mails.map(mail =>
                    <MailPreview key={mail.id} mail={mail} onRemoveMail={onRemoveMail} onMailClick={onMailClick}/>)
                }
            </tbody>
        </table>
    )
}
