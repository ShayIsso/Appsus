const { Link } = ReactRouterDOM

import { MainNav } from "./MainNav.jsx"
import { DarkScreen } from "./DarkScreen.jsx";

export function AppHeader() {

    function toggleMenu() {
        document.body.classList.toggle('menu-open');
    }

    return <header className="app-header">
        <Link to="/">
            <div className="logo-container flex">
                <img className="logo-img" src="assets/img/appsus.png" alt="appsus" />
                <h2 className="logo">
                    <span>A</span>
                    <span>p</span>
                    <span>p</span>
                    <span>s</span>
                    <span>u</span>
                    <span>s</span>
                </h2>
            </div>
        </Link>

        <DarkScreen toggleMenu={toggleMenu} />
        <MainNav toggleMenu={toggleMenu} />
        <button className="main-nav-btn" onClick={toggleMenu}>☰</button>

    </header>
}
