import axios from './axios'

export const authStatus = async () => {
  return axios.post('/auth')
}

export const login = async (username, password) => {
  return axios.post('/users', {
    username,
    password
  })
}

export const search = async (search) => {
  return axios.post('/search/', { search })
}

export const getRoom = async (id) => {
  return axios.get(`/rooms/${id}`)
}

export const getBuilding = async (id) => {
  return axios.get(`/buildings/${id}`)
}

export const getUser = async (id) => {
  return axios.get(`/users/${id}`)
}

export const getEvent = async (id) => {
  return axios.get(`/events/${id}`)
}

export const getBuildings = async () => {
  return axios.get('/buildings')
}

export const getRooms = async (id) => {
  return axios.get('/rooms/')
}

export const getEvents = async () => {
  return axios.get('/events')
}

export const getUsers = async () => {
  return axios.get('/users')
}

export const createBuilding = async (building) => {
  return axios.post('/buildings', {
    building
  })
}

export const createRoom = async (room) => {
  return axios.post('/rooms', {
    room
  })
}

export const createEvent = async (event) => {
  return axios.post('/events', {
    event
  })
}

export const createUser = async (user) => {
  return axios.post('/users', {
    user
  })
}

export const updateBuilding = async (building) => {
  const { id } = building
  return axios.put(`/buildings/${id}`, {
    building
  })
}

export const updateRoom = async (room) => {
  const { id } = room
  return axios.put(`/rooms/${id}`, { room })
}

export const updateEvent = async (event) => {
  const { id } = event
  return axios.put(`/events/${id}`, {
    event
  })
}

export const updateUser = async (user) => {
  const { id } = user
  return axios.put(`/users/${id}`, {
    user
  })
}

export const deleteBuilding = async (id) => {
  return axios.delete(`/buildings/${id}`)
}

export const deleteRoom = async (id) => {
  return axios.delete(`/rooms/${id}`)
}

export const deleteEvent = async (id) => {
  return axios.delete(`/events/${id}`)
}

export const deleteUser = async (id) => {
  return axios.delete(`/users/${id}`)
}
