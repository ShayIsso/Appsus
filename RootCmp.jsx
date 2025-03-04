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
import { MailLayout } from './apps/mail/cmps/MailLayout.jsx'

export function RootCmp() {
    return <Router>
        <section className="root-cmp">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailLayout />}>
                    <Route index element={<MailIndex />} />
                    <Route path=":mailId" element={<MailDetails />} />
                </Route>
                <Route path="/note" element={<NoteIndex />} />
                <Route path="/note/:noteId" element={<NoteEditPage />} />
            </Routes>
            <UserMsg />
        </section>
    </Router>
}
