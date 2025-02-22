const { useEffect, useState } = React
import { MailList } from "../cmps/MailList.jsx";
import { mailService } from "../services/mail.service.js";

export function MailIndex() {

    const [mails, setMails] = useState(null)

    useEffect(() => {
        mailService.query()
            .then(setMails)
    }, [])

    if (!mails) return <div>Loading...</div>
    return (
        <section className="container">
            <MailList mails={mails}/>
        </section>

    )
}

