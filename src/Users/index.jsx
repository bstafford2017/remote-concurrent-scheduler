import React, { useState } from 'react'
import { Input, Alert } from 'reactstrap'
import Button from '../components/Button'
import Spinner from '../components/Spinner'
import { deleteUser, updateUser } from '../Http/index'

const User = ({ user, removeUser }) => {
  const [updatedUser, setUpdatedUser] = useState({
    id: user?.id,
    username: user?.username,
    password: user?.password,
    confirmPassword: user?.password,
    firstName: user?.firstName,
    lastName: user?.lastName,
    admin: user?.admin
  })
  const [errors, setErrors] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { id, username, password, firstName, lastName, admin } = updatedUser

  const onUpdate = async () => {
    setIsLoading(true)
    try {
      await updateUser(updatedUser)
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      setErrors('Failed to update user.')
    }
  }

  const onDelete = async () => {
    setIsLoading(true)
    try {
      const { id } = updatedUser
      await deleteUser(id)
      setIsLoading(false)
      removeUser(id)
    } catch (e) {
      setIsLoading(false)
      setErrors('Failed to update user.')
    }
  }

  const onChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.id]: e.target.value
    })
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Alert color='danger' isOpen={!!errors} toggle={() => setErrors('')}>
        {errors}
      </Alert>
      <tr id={id}>
        <td>
          <Input
            type='text'
            id='username'
            value={username}
            onChange={onChange}
          />
        </td>
        <td>
          <Input
            type='password'
            id='password'
            value={password}
            onChange={onChange}
          />
        </td>
        <td>
          <Input
            type='text'
            id='firstName'
            value={firstName}
            onChange={onChange}
          />
        </td>
        <td>
          <Input
            type='text'
            id='lastName'
            value={lastName}
            onChange={onChange}
          />
        </td>
        <td>
          <Input
            type='select'
            id='admin'
            selected={!user.admin ? true : false}
            onChange={onChange}
          >
            <option>False</option>
            <option>True</option>
          </Input>
        </td>
        <td>
          <Button title='Update' className='update-room' onClick={onUpdate} />
        </td>
        <td>
          <Button title='Delete' className='delete-room' onClick={onDelete} />
        </td>
      </tr>
    </>
  )
}

export default User
