
export function Home() {
    
    
    return (
        <section className="home home-layout">
            <div className="background-circle"></div>

            <section className="content">
            <img className="appsus-logo"  src="../assets/img/appsus.png" alt="appsus" />
                <h1>Welcome to Appsus</h1>
                <div>
                    <img className="gmail-logo" src="../assets/img/gmail.svg" alt="" />
                    <img className="keep-logo" src="../assets/img/keep.svg" alt="" />
                </div>
            </section>

        </section>
    )
}


{/* <section className="container home">
        <h1>Welcome home</h1>
        <button onClick={() => showSuccessMsg('Yep, that works')}>Show Msg</button>
        <div className="box-container">
            <div className="box1"></div>
            <div className="box2"></div>
        </div>
    </section> */}