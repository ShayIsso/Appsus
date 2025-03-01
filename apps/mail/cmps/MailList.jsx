import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails, onRemoveMail }) {
    return (
        <table className="mail-list">
            <tbody>
                {mails.map(mail =>
                    <MailPreview key={mail.id} mail={mail} onRemoveMail={onRemoveMail} />)
                }
            </tbody>
        </table>
    )
}
