export const authStatus = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {
          user: {
            id: '1234',
            username: 'ben',
            password: 'pass',
            firstName: 'Ben',
            lastName: 'Stafford',
            admin: true
          }
        }
      })
    }, 500)
  })
}

export const login = async (username, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {
          user: {
            id: '1234',
            username: 'ben',
            password: 'pass',
            firstName: 'Ben',
            lastName: 'Stafford',
            admin: true
          }
        }
      })
    }, 3000)
  })
}

export const search = async (search) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {
          results: [
            {
              id: '101',
              title: 'dance party',
              startTime: '12:00:00',
              endTime: '13:00:00',
              startDate: '2020-09-09',
              endDate: '2020-09-09',
              building: '1',
              room: '1',
              recur: [false, true, false, false, false, false, true],
              user: '1'
            }
          ]
        }
      })
    }, 3000)
  })
}

export const getRoom = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {
          room: {
            id: '1',
            number: '203',
            projector: false,
            seats: 23,
            building: '1'
          }
        }
      })
    }, 3000)
  })
}

export const getBuilding = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {
          building: {
            id: '1',
            name: 'Johnston project center'
          }
        }
      })
    }, 3000)
  })
}

export const getUser = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {
          user: {
            id: '1234',
            username: 'ben',
            password: 'pass',
            firstName: 'Ben',
            lastName: 'Stafford',
            admin: true
          }
        }
      })
    }, 3000)
  })
}

export const getEvent = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {
          event: {
            id: '101',
            title: 'dance party',
            startTime: '12:00:00',
            endTime: '01:00:00',
            startDate: '2022-09-23',
            endDate: '2022-09-23',
            building: '1',
            room: '1',
            recur: [false, true, false, false, false, false, true],
            createdBy: '1'
          }
        }
      })
    }, 3000)
  })
}

export const getBuildings = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {
          buildings: [
            {
              id: '1',
              name: 'Johnston project center'
            }
          ]
        }
      })
    }, 3000)
  })
}

export const getRooms = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {
          rooms: [
            {
              id: '1',
              number: '203',
              projector: false,
              seats: 23,
              building: '1'
            }
          ]
        }
      })
    }, 3000)
  })
}

export const getEvents = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {
          events: [
            {
              id: '101',
              title: 'dance party',
              startTime: '12:00:00',
              endTime: '13:00:00',
              startDate: '2022-09-23',
              endDate: '2022-09-23',
              building: '1',
              room: '1',
              recur: [false, true, false, false, false, false, true],
              recurEnd: '2023-09-23',
              createdBy: '1'
            },
            {
              id: '102',
              title: 'pizza time',
              startTime: '06:00:00',
              endTime: '13:00:00',
              startDate: '2022-09-06',
              endDate: '2022-09-06',
              building: '1',
              room: '1',
              recur: [false, true, false, false, false, false, true],
              recurEnd: '2023-09-23',
              createdBy: '1'
            },
            {
              id: '103',
              title: 'bingo bango',
              startTime: '15:00:00',
              endTime: '16:00:00',
              startDate: '2022-10-18',
              endDate: '2022-10-18',
              building: '1',
              room: '1',
              recur: [false, true, false, false, false, false, true],
              recurEnd: '2023-09-23',
              createdBy: '1'
            },
            {
              id: '104',
              title: 'meeting son',
              startTime: '08:00:00',
              endTime: '11:00:00',
              startDate: '2022-10-18',
              endDate: '2022-10-18',
              building: '1',
              room: '1',
              recur: [false, true, false, false, false, false, true],
              recurEnd: '2023-09-23',
              createdBy: '1'
            }
          ]
        }
      })
    }, 3000)
  })
}

export const getUsers = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {
          users: [
            {
              id: '1234',
              username: 'ben',
              password: 'pass',
              firstName: 'Ben',
              lastName: 'Stafford',
              admin: true
            }
          ]
        }
      })
    }, 3000)
  })
}

export const createBuilding = async (building) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {}
      })
    }, 3000)
  })
}

export const createRoom = async (room) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {}
      })
    }, 3000)
  })
}

export const createEvent = async (event) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {}
      })
    }, 3000)
  })
}

export const createUser = async (user) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {}
      })
    }, 3000)
  })
}

export const updateBuilding = async (building) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {}
      })
    }, 3000)
  })
}

export const updateRoom = async (room) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {}
      })
    }, 3000)
  })
}

export const updateEvent = async (event) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {}
      })
    }, 3000)
  })
}

export const updateUser = async (user) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {}
      })
    }, 3000)
  })
}

export const deleteBuilding = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {}
      })
    }, 3000)
  })
}

export const deleteRoom = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {}
      })
    }, 3000)
  })
}

export const deleteEvent = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {}
      })
    }, 3000)
  })
}

export const deleteUser = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {}
      })
    }, 3000)
  })
}
