const { useParams, Link, useNavigate } = ReactRouterDOM

import { mailService } from "../services/mail.service.js";
import { utilService } from '../../../services/util.service.js'

const { useEffect, useState } = React

export function MailDetails() {

    const [mail, setMails] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [mailId])

    function loadMail() {
        mailService.get(mailId)
            .then(setMails)
            .catch(() => {
                navigate(`/mail`)
            })
    }

    if (!mail) return <div>Loading...</div>
    const { subject, from, to, sentAt, body } = mail
    const formattedDate = utilService.getFormatDate(sentAt)
    return (
        <article className="mail-details">
            <button ><Link to="/mail">Back</Link></button>

            <header className="mail-header">
                <h2>{subject}</h2>
                <div className="mail-meta">
                    <span className="mail-sender"><strong>From:</strong>{from}</span>
                    <span className="mail-recipient"><strong>To:</strong> {to}</span>
                    <span className="mail-date">{formattedDate}</span>
                </div>
            </header>

            <section className="mail-content">
                <p>{body}</p>
            </section>

        </article>
    )
}