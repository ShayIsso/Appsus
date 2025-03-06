const { Outlet } = ReactRouterDOM
const { useState, useEffect } = React

import { MailHeader } from '../cmps/MailHeader.jsx'
import { SideBar } from '../cmps/SideBar.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'
import { mailService } from '../services/mail.service.js';


export function MailLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showCompose, setShowCompose] = useState(false)
  const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
  const [unreadCounts, setUnreadCounts] = useState({ inbox: 0, sent: 0, draft: 0, trash: 0, star: 0, important: 0 })

  useEffect(() => {
    loadUnreadCounts()
  }, [filterBy])

  function loadUnreadCounts() {
    mailService.calcUnreadMails()
      .then(setUnreadCounts)
      .catch(err => console.error("Failed to fetch unread counts", err))
  }

  const onLoadUnreadCounts = loadUnreadCounts

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev)

  function onSetFilterBy(newFilter) {
    setFilterBy(prevFilter => ({ ...prevFilter, ...newFilter }))
  }

  function onSetFilterStatus(status) {
    setFilterBy(prevFilter => ({ ...prevFilter, status: status }))
  }

  return (
    <section className="mail-container">
      <MailHeader onMenuClick={toggleSidebar}
        filterBy={filterBy}
        onSetFilterBy={onSetFilterBy}
      />
      <div className={`app-content-container flex ${isSidebarOpen ? '' : 'with-margin'}`}>
        <SideBar
          onComposeClick={() => setShowCompose(true)}
          isOpen={isSidebarOpen}
          onSetFilterStatus={onSetFilterStatus}
          currentStatus={filterBy.status}
          unreadCounts={unreadCounts}
        />
        <Outlet context={{ filterBy, onSetFilterBy, onLoadUnreadCounts }} />
      </div>
      {showCompose && <MailCompose onClose={() => setShowCompose(false)} />}
    </section>
  )
}