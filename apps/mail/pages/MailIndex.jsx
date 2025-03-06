const { useEffect, useState } = React
const { useNavigate, useOutletContext } = ReactRouterDOM

import { MailList } from "../cmps/MailList.jsx";
import { mailService } from "../services/mail.service.js";

export function MailIndex() {
    const { filterBy } = useOutletContext()
    const [mails, setMails] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy)
            .then(setMails)
            .catch(err => console.error('Failed to fetch mails:', err))
    }

    function mailClick(mailId) {
        const currMail = mails.find(mail => mail.id === mailId)

        if (currMail.isRead) {
            navigate(`/mail/${mailId}`)
            return
        }

        mailService.save({ ...currMail, isRead: true })
            .then(() => navigate(`/mail/${mailId}`))
            .catch(error => {
                console.error("Failed to update mail as read:", error)
                navigate(`/mail/${mailId}`)
            })
    }

    function toggleStatus(mailId, statusType) {
        setMails(prevMails =>
            prevMails.map(mail =>
                mail.id === mailId ? { ...mail, [statusType]: !mail[statusType] } : mail
            )
        )

        const currMail = mails.find(mail => mail.id === mailId)

        mailService.save({ ...currMail, [statusType]: !currMail[statusType] })
            .catch(error => console.error(`Failed to save mail status: ${statusType}`, error))
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
            <MailList mails={mails} onMailClick={mailClick} onToggleStatus={toggleStatus} />
        )
}

