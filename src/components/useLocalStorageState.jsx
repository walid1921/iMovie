import { useState, useEffect } from "react";

function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState
  });

  useEffect(function () {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key]) // we have to call it here so that it called every time the data is rendered

  return [value, setValue]
}

export default useLocalStorageState
