const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'
import { NoteEditPage } from './apps/note/pages/NoteEditPage.jsx'
import { MailDetails } from './apps/mail/pages/MailDetails.jsx'

export function RootCmp() {
    return <Router>
        <section className="root-cmp">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} />
                <Route path="/mail/:mailId" element={<MailDetails />} />

                <Route path="/note" element={<NoteIndex />} />
                <Route path="/trash" element={<NoteIndex />} />
                <Route path="/archived" element={<NoteIndex />} />
                <Route path="/note/edit/:noteId" element={<NoteEditPage />} />
                <Route path="/note/edit" element={<NoteEditPage />} />
            </Routes>
            <UserMsg />
        </section>
    </Router>
}
