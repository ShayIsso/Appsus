import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
  query,
  get,
  getEmptyNote,
  remove,
  save,
}

function query() {
  return storageService.query(NOTE_KEY)
}

function get(noteId) {
  const res = storageService.get(NOTE_KEY, noteId)
  console.log(' res:', res)
  return res
}

function remove(noteId) {
  return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTE_KEY, note)
  } else {
    return storageService.post(NOTE_KEY, note)
  }
}

// function getEmptyNote(title = '', txt = '') {
//   return { title, txt }
// }

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
    notes = []
    notes.push(_createNote(utilService.makeLorem(1), utilService.makeLorem(9)))
    notes.push(_createNote(utilService.makeLorem(1), utilService.makeLorem(2)))
    notes.push(_createNote(utilService.makeLorem(1), utilService.makeLorem(6)))
    notes.push(_createNote(utilService.makeLorem(1), utilService.makeLorem(15)))

    utilService.saveToStorage(NOTE_KEY, notes)
  }
}

function _createNote(title, txt) {
  const note = getEmptyNote(title, txt)
  note.id = utilService.makeId()
  return note
}

function getEmptyNote(title = '', txt = '') {
  const note = {
    createdAt: Date.now() - 2000,
    type: 'txt',
    isPinned: false,
    style: {
      backgroundColor: utilService.getRandomColor(),
    },
    info: {
      title,
      txt,
    },
  }

  return note
}
