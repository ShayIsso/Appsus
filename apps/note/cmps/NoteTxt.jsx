

export function NoteTxt({ note }) {
    const { info } = note
    return (
        <React.Fragment>
            <h2 className="title">{info.title}</h2>
            <div className="txt" style={{ whiteSpace: "pre-wrap" }}>{info.txt}</div>
        </React.Fragment>
    )
}