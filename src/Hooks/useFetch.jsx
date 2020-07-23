import React, { useEffect, useState } from 'react'
import axios from '../Http/axios'

const useFetch = (url: string) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [shouldRefresh, refresh] = useState({})

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      try {
        const { data: res } = await axios.get(url)
        setData(res)
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [url, shouldRefresh])

  return [data, isLoading, refresh]
}

export default useFetch
