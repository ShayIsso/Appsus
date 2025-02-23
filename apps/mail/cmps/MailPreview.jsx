const { Link } = ReactRouterDOM

export function MailPreview({ mail, onRemoveMail }) {

    const { subject, from, to, body } = mail
    return (
        <tr>
            <td onClick={() => onRemoveMail(mail.id)}>X</td>
            <td>{subject}</td>
            <td>{from}</td>
            <td>{to}</td>
            <td>{body}</td>
            <td><Link to={`/mail/${mail.id}`}>Details</Link></td>
        </tr>
    )
}