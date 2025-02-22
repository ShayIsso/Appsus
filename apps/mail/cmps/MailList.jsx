import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Subject</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Body</th>
                </tr>
            </thead>
            <tbody className="mail-list">
                    {mails.map(mail =>
                            <MailPreview key={mail.id} mail={mail} />)}
            </tbody>
        </table>
    )
}
