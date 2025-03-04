const { Outlet } = ReactRouterDOM 
const {  useState } = React

import { MailHeader } from '../cmps/MailHeader.jsx'
import { SideBar } from '../cmps/SideBar.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'

export function MailLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showCompose, setShowCompose] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev)

  return (
    <section className="mail-container">
      <MailHeader onMenuClick={toggleSidebar} />
      <div className={`app-content-container flex ${isSidebarOpen ? '' : 'with-margin'}`}>
        <SideBar onComposeClick={() => setShowCompose(true)} isOpen={isSidebarOpen} />
        <Outlet />
      </div>
      {showCompose && <MailCompose onClose={() => setShowCompose(false)} />}
    </section>
  )
}
