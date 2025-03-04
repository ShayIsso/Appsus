import { mailService } from "../services/mail.service.js";

const { useState } = React

export function MailCompose({ onClose }) {
    const [mailToCompose, setMailCompose] = useState(mailService.getEmptyMail())
    const [isExpanded, setIsExpanded] = useState(false)

    function onSave(ev) {
        ev.preventDefault()
        mailToCompose.sentAt = Date.now()

        mailService.save(mailToCompose)
            .then(() => console.log('Mail has successfully sent!'))
            .catch(() => console.log(`couldn't sent mail`))
            .finally(onClose)
    }

    function handleChange({ target }) {
        const { type, name: prop } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break;
        }
        setMailCompose(prevMail => ({ ...prevMail, [prop]: value }))
    }

    const { to, subject, body } = mailToCompose


    return (
        <React.Fragment >
            {isExpanded && <div className="dark-screen-app" onClick={onClose}></div>}
            <article className={`mail-compose ${isExpanded ? "expanded" : ""}`}>
                <div className="compose-header flex align-center space-between">
                    <span>New Message</span>
                    <div className="compose-actions">
                        <button onClick={() => setIsExpanded(!isExpanded)}>
                            <img src={`assets/img/expand-icon${isExpanded ? '-close' : ''}.svg`} alt="expand icon" />
                        </button>
                        <button onClick={onClose}>
                            <img src="assets/img/close-icon.svg" alt="close icon" />
                        </button>
                    </div>
                </div>

                <form className="flex column" onSubmit={onSave}>
                    <input autoFocus onChange={handleChange} value={to} id='to' type="text" name='to' placeholder="Recipients" />
                    <input onChange={handleChange} value={subject} id='subject' type="text" name='subject' placeholder="Subject" />
                    <textarea onChange={handleChange} value={body} id='body' name='body' ></textarea>
                    <div className="compose-footer flex align-center">
                        <button type="submit">Send</button>
                    </div>
                </form>
            </article>
        </React.Fragment>
    )
}