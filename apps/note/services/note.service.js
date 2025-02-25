import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
  query,
  get,
  remove,
  save,
}

function query() {
  return storageService.query(NOTE_KEY)
}

function get(noteId) {
  return storageService.get(NOTE_KEY, noteId)
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

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
    notes = []
    notes.push(_createNote('NoteTxt'))
    notes.push(_createNote('NoteTxt'))
    notes.push(_createNote('NoteTxt'))
    utilService.saveToStorage(NOTE_KEY, notes)
    console.log(' notes:', notes)
  }
}

function _createNote(type) {
  const note = _getNote(type)
  note.id = utilService.makeId()
  return note
}

function _getNote(type) {
  const note = {
    createdAt: Date.now() - 2000,
    type,
    isPinned: false,
    style: {
      backgroundColor: utilService.getRandomColor(),
    },
  }
  switch (type) {
    case 'NoteImg':
      note.info = {
        url: 'https://picsum.photos/200',
        title: utilService.makeLorem(2),
      }
      break
    case 'NoteToDos':
      note.info = {
        title: utilService.makeLorem(2),
        todos: [
          { txt: utilService.makeLorem(3), doneAt: null },
          { txt: utilService.makeLorem(3), doneAt: 187111111 },
        ],
      }
      break
    default:
      note.info = {
        title: utilService.makeLorem(1),
        txt: utilService.makeLorem(4),
      }
  }

  return note
}
