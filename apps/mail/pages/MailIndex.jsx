const { useEffect, useState } = React
const { useNavigate } = ReactRouterDOM

import { MailHeader } from "../cmps/MailHeader.jsx";
import { MailList } from "../cmps/MailList.jsx";
import { SideBar } from "../cmps/SideBar.jsx";
import { mailService } from "../services/mail.service.js";

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        mailService.query()
            .then(setMails)
    }, [])

    function mailClick(mailId) {
        navigate(`/mail/${mailId}`)
    }

    function toggleStarred(mailId) {
        setMails(prevMails =>
            prevMails.map(mail =>
                mail.id === mailId ? { ...mail, isStarred: !mail.isStarred } : mail
            )
        )

        const currMail = mails.find(mail => mail.id === mailId)

        mailService.save({ ...currMail, isStarred: !currMail.isStarred })
            .catch(error => console.error("Failed to save mail:", error))
    }

    function removeMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setMails(mails =>
                    mails.filter(mail => mail.id !== mailId))
                showSuccessMsg(`Mail (${mailId}) removed successfully!`)
            })
            .catch(err => {
                console.log('Problems removing mail:', err)
                showErrorMsg(`Having problems removing mail!`)
            })
    }

    if (!mails) return <div>Loading...</div>
    return (
        <section className="mail-container">
            <MailHeader />
            <div className="app-content-container flex">
                <SideBar />
                <MailList mails={mails} onRemoveMail={removeMail} onMailClick={mailClick} onToggleStarred={toggleStarred} />
            </div>
        </section>

    )
}

