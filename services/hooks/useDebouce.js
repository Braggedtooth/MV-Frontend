import { useEffect, useState } from 'react'

const useDebounce = (value, delay) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)
      return () => {
        clearTimeout(handler)
        setDebouncedValue('')
      }
    },
    [value, delay]
  )
  return debouncedValue
}
export default useDebounce