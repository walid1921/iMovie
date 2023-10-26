import { useRef } from "react";
import useKey from "./useKey"

function SearchBar({ query, setQuery }) {

  const inputEl = useRef(null)

  useKey('Enter', () => {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus()
    setQuery('')
  })

  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
    </div>
  )
}

export default SearchBar
