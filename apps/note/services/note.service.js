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
  getFilterFromSearchParams,
}

function getFilterFromSearchParams(searchParams) {
  const text = searchParams.get('text') || ''
  const side = searchParams.get('side') || ''
  return { text, side }
}

function query(filterBy = {}) {
  return storageService.query(NOTE_KEY).then((notes) => {
    if (filterBy.text) {
      const regExp = new RegExp(filterBy.text, 'i')
      notes = notes.filter((note) => regExp.test(note.info.txt))
    }
    if (filterBy.side === undefined || filterBy.side === '') {
      notes = notes.filter((note) => note.state === 'active')
    }
    if (filterBy.side === 'deleted') {
      notes = notes.filter((note) => note.state === 'deleted')
    }

    if (filterBy.side === 'archived') {
      notes = notes.filter((note) => note.state === 'archived')
    }

    return notes
  })
}

function get(noteId) {
  return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
  return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
  if (note.id) {
    if (note.state === 'add' || note.state === 'addOne') note.state = 'active'
    return storageService.put(NOTE_KEY, note)
  } else {
    if (note.state === 'add' || note.state === 'addOne') note.state = 'active'
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
    notes.push(
      _createNote({
        type: 'txt',
        title: 'First note',
        txt: 'Fullstack Me Baby!',
      })
    )
    notes.push(
      _createNote({
        type: 'txt',
        txt: 'Fullstack Me Baby!',
      })
    )
    notes.push(
      _createNote({
        type: 'todos',
        title: 'Get my stuff together',
        todos: [
          { txt: 'Driving license', isDone: false },
          { txt: 'Coding power', isDone: false },
        ],
      })
    )
    notes.push(_createNote({ type: 'txt', title: 'Second note', txt: 'Full' }))
    notes.push(
      _createNote({
        type: 'img',
        title: 'Bobi and Me',
        url: 'https://i.ytimg.com/vi/2o0lqYXqHx8/maxresdefault.jpg',
        txt: 'Good times',
      })
    )

    notes.push(
      _createNote({
        type: 'video',
        title: 'Bobi and Me',
        videoUrl:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        txt: 'Good times',
      })
    )
    utilService.saveToStorage(NOTE_KEY, notes)
  }
}

function _createNote(props) {
  const note = getEmptyNote(props)
  note.id = utilService.makeId()
  return note
}

// function getEmptyNote(title = '', txt = '', backgroundColor = 'white') {
//   const note = {
//     createdAt: Date.now() - 2000,
//     type: 'txt',
//     isPinned: false,
//     state: 'active',
//     style: {
//       backgroundColor,
//     },
//     info: {
//       title,
//       txt,
//     },
//   }

//   return note
// }

function getEmptyNote({
  type = 'txt',
  title = '',
  txt = '',
  backgroundColor = 'white',
  url = '',
  videoUrl = '',
  todos = [],
  state = 'active',
} = {}) {
  const note = {
    createdAt: Date.now(),
    type,
    isPinned: false,
    state,
    style: { backgroundColor },
    info: {},
  }

  switch (type) {
    case 'txt':
      note.info.title = title
      note.info.txt = txt
      break
    case 'img':
      note.info.url = url
      note.info.title = title
      note.info.txt = txt
      break
    case 'todos':
      note.info.title = title
      note.info.todos = todos.length ? todos : [{ txt: '', isDone: false }]
      break
    case 'video':
      note.info.videoUrl = videoUrl
      note.info.title = title
      note.info.txt = txt
      break
    default:
      throw new Error(`Unknown note type: ${type}`)
  }

  return note
}
