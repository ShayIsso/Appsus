import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'

const mail1 = {
    createdAt: Date.now() - 2000,
    subject: 'Get Instant Feedback on your challenges',
    body: 'Hello Shay Isso! Over the years, many users have asked for help, guidance, and insights on their challenge solutions. So today, were excited to announce our AI-powered code review feature. Were calling it Instant Feedback',
    isRead: false,
    sentAt: 1551133930594,
    removedAt: null,
    from: 'shayniso@gmail.com',
    to: 'user@appsus.com'
}
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
}

function query() {
    return storageService.query(MAIL_KEY)
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}


function _createMails() {
    let mail = utilService.loadFromStorage(MAIL_KEY)
    if (!mail || !mail.length) {
        mail = []
        mail.push(_createMail('shay@gmail.com'))
        mail.push(_createMail('david@gmail.com'))
        mail.push(_createMail('ilana@gmail.com'))
        mail.push(mail1)
        mail.push(_createMail('or@gmail.com'))
        utilService.saveToStorage(MAIL_KEY, mail)
    }
}

function _createMail(from) {
    const mail = getMail(from)
    mail.id = utilService.makeId()
    return mail
}

function getMail(from) {
    return {
        createdAt: Date.now() - 2000,
        subject: utilService.makeLorem(1),
        body: utilService.makeLorem(2),
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: from,
        to: 'user@appsus.com'
    }
}
