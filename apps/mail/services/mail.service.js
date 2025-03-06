import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'

const loggedinUser = {
    email: 'mrsuso7@gmail.com',
    fullname: 'App Suso'
}

const demoMails = [
    {
        id: utilService.makeId(),
        createdAt: Date.now() - 100000,
        subject: 'Welcome to Gmail! Tips & Tricks',
        body: 'Hey there! Learn how to get the most out of your Gmail experience with these quick tips.',
        isRead: false,
        isStarred: false,
        isImportant: false,
        sentAt: 1672485600000,
        removedAt: null,
        from: 'gmail-team@gmail.com',
        to: 'user@appsus.com'
    },
    {
        id: utilService.makeId(),
        createdAt: Date.now() - 500000,
        subject: 'Your order has been shipped!',
        body: 'Your package is on its way! You can track your order here: www.trackmypackage.com.',
        isRead: true,
        isStarred: false,
        isImportant: false,
        sentAt: 1672419200000,
        removedAt: null,
        from: 'store@amazon.com',
        to: 'user@appsus.com'
    },
    {
        id: utilService.makeId(),
        createdAt: Date.now() - 800000,
        subject: 'Meeting reminder: Project Sync-Up',
        body: 'Reminder: Your project sync-up is scheduled for tomorrow at 10:00 AM.',
        isRead: false,
        isStarred: false,
        isImportant: false,
        sentAt: 1672354800000,
        removedAt: null,
        from: 'manager@company.com',
        to: 'user@appsus.com'
    },
    {
        id: utilService.makeId(),
        createdAt: Date.now() - 1200000,
        subject: 'Flash Sale! Up to 50% off',
        body: 'Exclusive deal just for you! Limited time only. Grab your favorite items now.',
        isRead: true,
        isStarred: false,
        isImportant: false,
        sentAt: 1672280400000,
        removedAt: null,
        from: 'newsletter@ebay.com',
        to: 'user@appsus.com'
    },
    {
        id: utilService.makeId(),
        createdAt: Date.now() - 1500000,
        subject: 'Security Alert: New Login Detected',
        body: "We detected a new login to your account from an unfamiliar device. If this wasn't you, please secure your account.",
        isRead: false,
        isStarred: false,
        isImportant: false,
        sentAt: 1672216000000,
        removedAt: null,
        from: 'security@google.com',
        to: 'user@appsus.com'
    }
]

_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    calcUnreadMails
}

function query(filterBy) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regex.test(mail.subject) || regex.test(mail.body))
            }
            
            if (filterBy.isRead !== '') {
                mails = mails.filter(mail => mail.isRead === filterBy.isRead)
            }

            switch (filterBy.status) {
                case 'inbox':
                    mails = mails.filter(mail => 
                        mail.from !== loggedinUser.email && 
                        !mail.removedAt && 
                        mail.sentAt
                    )
                    break
                    
                case 'star':
                    mails = mails.filter(mail => mail.isStarred)
                    break
                    
                case 'important':
                    mails = mails.filter(mail => mail.isImportant)
                    break
                    
                case 'sent':
                    mails = mails.filter(mail => 
                        mail.from === loggedinUser.email && 
                        mail.sentAt && 
                        !mail.removedAt
                    )
                    break
                    
                case 'trash':
                    mails = mails.filter(mail => mail.removedAt)
                    break
                    
                case 'draft':
                    mails = mails.filter(mail => !mail.sentAt && !mail.removedAt)
                    break
                    
                case 'snoozed':
                    mails = []
                    break
                    
                default:
                    mails = mails.filter(mail => 
                        mail.from !== loggedinUser.email && 
                        !mail.removedAt && 
                        mail.sentAt
                    )
            }

            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function calcUnreadMails() {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            return mails.reduce((acc, mail) => {
                if (mail.from !== loggedinUser.email && !mail.removedAt && !mail.isRead) acc.inbox++
                if (mail.from === loggedinUser.email && mail.sentAt && !mail.removedAt && !mail.isRead) acc.sent++
                if (!mail.sentAt && !mail.removedAt && !mail.isRead) acc.draft++
                if (mail.removedAt && !mail.isRead) acc.trash++
                if (mail.isStarred && !mail.isRead) acc.star++
                if (mail.isImportant && !mail.isRead) acc.important++
                return acc;
            }, { inbox: 0, sent: 0, trash: 0, draft: 0, star: 0, important: 0 })
        })
}

function getDefaultFilter() {
    return {
        status: 'inbox',
        txt: '',
        isRead: '',
        lables: [],
    }
}

function getEmptyMail() {
    return {
        createdAt: Date.now(),
        subject: '',
        body: '',
        isRead: false,
        isStarred: false,
        isImportant: false,
        sentAt: null,
        removedAt: null,
        from: loggedinUser.email,
        to: ''
    }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [...demoMails]
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}