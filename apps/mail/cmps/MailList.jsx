import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails, onMailClick, onToggleStarred, isSidebarOpen }) {
    return (
        <table className={`mail-list ${isSidebarOpen ? 'margin-left' : ''}`}>
            <tbody>
                {mails.map(mail =>
                    <MailPreview key={mail.id} mail={mail} onMailClick={onMailClick}  onToggleStarred={onToggleStarred}/>)
                }
            </tbody>
        </table>
    )
}
