export function MailPreview({ mail }) {

    const { subject, from, to, body } = mail
    return (
        <tr>
            <td>{subject}</td>
            <td>{from}</td>
            <td>{to}</td>
            <td>{body}</td>
        </tr>
    )
}