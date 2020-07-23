import React, { useEffect, useRef, useState } from 'react'
import { Row, Col, Card, CardBody, Table, Alert } from 'reactstrap'
import CreateUser from './CreateUser'
import User from '.'
import { getUsers, deleteUser } from '../Http/index'
import Spinner from '../components/Spinner'
import Dots from '../components/Dots'
import styledComponents from 'styled-components'

const CardWrapper = styledComponents(Card)`
  background-color: #eee;
  color: #000;
  margin-top: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
`

const ManageUsers = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState('')
  const [users, setUsers] = useState([])
  const mounted = useRef(false)

  const removeUser = async (id) => {
    setIsLoading(true)
    try {
      await deleteUser(id)
      setIsLoading(false)
      setUsers(users.filter((u) => u.id !== id))
    } catch ({ message }) {
      setErrors('Error removing a user')
      setIsLoading(false)
    }
  }

  useEffect(() => {
    mounted.current = true
    ;(async () => {
      setIsLoading(true)
      try {
        const response = await getUsers()
        const { data } = response
        const { users = [] } = data
        if (mounted.current) {
          setIsLoading(false)
          setUsers(users)
        }
      } catch ({ message }) {
        if (mounted.current) {
          setErrors(message)
          setIsLoading(false)
        }
      }
    })()
    return () => {
      mounted.current = false
    }
  }, [])

  return (
    <>
      <Alert color='danger' isOpen={!!errors} toggle={() => setErrors('')}>
        {errors}
      </Alert>
      <CreateUser users={users} setUsers={setUsers} />
      <Col md={{ size: 8, offset: 2 }} lg={{ size: 12, offset: 0 }}>
        <CardWrapper>
          <h2 style={{ textAlign: 'center' }}>Manage Users</h2>
          <CardBody>
            <Dots display={isLoading} />
            {!isLoading && (
              <Table responsive>
                <thead>
                  <tr>
                    <th scope='col'>Username</th>
                    <th scope='col'>Password</th>
                    <th scope='col'>First Name</th>
                    <th scope='col'>Last Name</th>
                    <th scope='col'>Admin</th>
                    <th scope='col'></th>
                    <th scope='col'></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <User key={u.id} user={u} removeUser={removeUser} />
                  ))}
                </tbody>
              </Table>
            )}
          </CardBody>
        </CardWrapper>
      </Col>
    </>
  )
}

export default ManageUsers
