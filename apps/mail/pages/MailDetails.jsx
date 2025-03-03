const { useParams, Link, useNavigate } = ReactRouterDOM

import { mailService } from "../services/mail.service.js";
import { utilService } from '../../../services/util.service.js'
import { MailHeader } from "../cmps/MailHeader.jsx"
import { SideBar } from "../cmps/SideBar.jsx"

const { useEffect, useState } = React

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [mailId])

    function loadMail() {
        mailService.get(mailId)
            .then(setMail)
            .catch(() => {
                navigate(`/mail`)
            })
    }

    function goBack() {
        navigate('/mail')
    }

    if (!mail) return <div>Loading...</div>
    const { subject, from, to, sentAt, body } = mail
    const formattedDate = utilService.getFormatDate(sentAt)
    const senderName = from.split('@')[0]

    return (
        <section className="mail-container">
            <MailHeader />
            <div className="app-content-container">
                <SideBar />
                <section className="mail-details">
                    <button className="back-btn flex align-center" onClick={goBack}>
                        <img src="assets/img/arrow-back.svg" alt="inbox icon" />
                    </button>

                    <h1 className="mail-subject">{subject}</h1>

                    <div className="sender-row flex align-center space-between">
                        <div className="sender-info flex align-center">
                            <span className="sender-name">{senderName}</span>
                            <span className="sender-email">&lt;{from}&gt;</span>
                        </div>
                        <div className="mail-date">{formattedDate}</div>
                    </div>

                    <div className="recipient-info">to: {to}</div>

                    <div className="mail-content">{body}</div>
                </section>
            </div>
        </section>
    )
}
