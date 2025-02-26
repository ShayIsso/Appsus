const { useEffect, useState } = React
import { MailHeader } from "../cmps/MailHeader.jsx";
import { MailList } from "../cmps/MailList.jsx";
import { SideBar } from "../cmps/SideBar.jsx";
import { mailService } from "../services/mail.service.js";

export function MailIndex() {

    const [mails, setMails] = useState(null)

    useEffect(() => {
        mailService.query()
            .then(setMails)
    }, [])

    function onRemoveMail(mailId) {
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
                <MailList mails={mails} onRemoveMail={onRemoveMail}/>
            </div>
        </section>

    )
}

