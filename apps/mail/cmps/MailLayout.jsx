const { Outlet } = ReactRouterDOM
const { useState } = React

import { MailHeader } from '../cmps/MailHeader.jsx'
import { SideBar } from '../cmps/SideBar.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'
import { mailService } from '../services/mail.service.js';


export function MailLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showCompose, setShowCompose] = useState(false)
  const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter());

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev)

  function onSetFilterBy(newFilter) {
    setFilterBy(prevFilter => ({ ...prevFilter, ...newFilter }));
  }

  return (
    <section className="mail-container">
      <MailHeader onMenuClick={toggleSidebar}
                  filterBy={filterBy}
                  onSetFilterBy={onSetFilterBy} 
      />
      <div className={`app-content-container flex ${isSidebarOpen ? '' : 'with-margin'}`}>
        <SideBar onComposeClick={() => setShowCompose(true)} isOpen={isSidebarOpen} />
        <Outlet context={{ filterBy, onSetFilterBy }} />
      </div>
      {showCompose && <MailCompose onClose={() => setShowCompose(false)} />}
    </section>
  )
}
