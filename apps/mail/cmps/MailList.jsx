import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails, onRemoveMail }) {
    return (
        <table>
            <tbody className="mail-list">
                    {mails.map(mail =>
                            <MailPreview key={mail.id} mail={mail} onRemoveMail={onRemoveMail}/>
                        )
                            }
            </tbody>
        </table>
    )
}
