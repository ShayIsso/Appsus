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
        isStarred: null,
        isImportant: null,
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
        isStarred: null,
        isImportant: null,
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
        isStarred: null,
        isImportant: null,
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
        isStarred: null,
        isImportant: null,
        sentAt: 1672280400000,
        removedAt: null,
        from: 'newsletter@ebay.com',
        to: 'user@appsus.com'
    },
    {
        id: utilService.makeId(),
        createdAt: Date.now() - 1500000,
        subject: 'Security Alert: New Login Detected',
        body: 'We detected a new login to your account from an unfamiliar device. If this wasn’t you, please secure your account.',
        isRead: false,
        isStarred: null,
        isImportant: null,
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

            if (filterBy.status === 'star') {
                mails = mails.filter(mail => mail.isStarred)
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

function getDefaultFilter() {
    return {
        status: 'inbox',
        txt: '',
        isRead: '',
        isStared: null,
        lables: [],
    }
}

function getEmptyMail() {
    return {
        createdAt: Date.now(),
        subject: '',
        body: '',
        isRead: null,
        sentAt: null,
        isStared: null,
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