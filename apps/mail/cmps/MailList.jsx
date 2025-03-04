import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails, onMailClick, onToggleStatus, isSidebarOpen }) {
    return (
        <table className={`mail-list ${isSidebarOpen ? 'margin-left' : ''}`}>
            <tbody>
                {mails.map(mail =>
                    <MailPreview key={mail.id} mail={mail} onMailClick={onMailClick}  onToggleStatus={onToggleStatus}/>)
                }
            </tbody>
        </table>
    )
}
