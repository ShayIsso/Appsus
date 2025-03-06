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




        <div >
          <form className="search-bar" onSubmit={onSubmitFilter}>
            <button><span className="material-icons search-btn">search</span></button>
            <input ref={searchRef} name="text" value={text} type="text" onChange={handleChange} placeholder="Search" />
            <button onClick={() => setFilterByToEdit({ text: '' })}><span className="material-icons close-btn">close</span></button>
          </form>
        </div>
      </section>




    </header>
  )
}

