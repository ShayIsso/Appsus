import { utilService } from "../../../services/util.service.js"

const { useState, useEffect, useRef } = React

export function KeepHeader({ filterBy, onSetFilter }) {

  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  const onSetFilterDebounced = useRef(utilService.debounce(onSetFilter, 500))

  const searchRef = useRef()

  useEffect(() => {
    onSetFilterDebounced.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {

    let { value, name: field } = target


    setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
  }

  function onSubmitFilter(ev) {
    ev.preventDefault()
    onSetFilter(filterByToEdit)
  }

  const { text } = filterByToEdit

  return (
    <header className="keep-header flex align-center">

      <section className="flex align-center">
        <button className="menu-btn"><span className="material-icons">menu</span></button>
        <img className="keep-logo" src="assets/img/google-keep-logo.png" alt="keep logo"></img>
        <h1 className="keep-title">Keep</h1>



        <div >
          <form className="search-bar" onSubmit={onSubmitFilter}>
            <button><span className="material-icons search-btn">search</span></button>
            <input ref={searchRef} name="text" value={text} type="text" onChange={handleChange} placeholder="Search" />
            <button onClick={() => setFilterByToEdit({ text: '' })}><span className="material-icons close-btn">close</span></button>
          </form>
        </div>
      </section>


      <section className="flex align-center">
        <button><span className="material-icons refresh-btn">replay</span></button>
        <button><span className="material-icons-outlined">view_agenda</span></button>
        <button><span className="material-icons-outlined">settings</span></button>
      </section>

    </header>
  )
}

