import axios from 'axios'

export default axios.create({
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
