import React, { useState } from 'react'
import { search } from '../Http'

export const useSearch = () => {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState('')

  const fetch = async (searchInput) => {
    setLoading(true)
    try {
      const response = await search(searchInput)
      const { data } = response
      const { results } = data
      setResults(results)
    } catch (e) {
      setErrors(e.message)
    } finally {
      setLoading(false)
    }
  }

  return [results, loading, errors, fetch]
}

export default useSearch
