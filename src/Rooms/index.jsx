import React, { useState } from 'react'
import { Input } from 'reactstrap'
import Button from '../components/Button'
import { deleteRoom, updateRoom } from '../Http/index'

const Room = ({ room, removeRoom }) => {
  const [updatedRoom, setUpdatedRoom] = useState({
    id: room?.id,
    seats: room?.seats,
    number: room?.number,
    projector: room?.projector,
    building: {
      name: room?.building?.name
    }
  })
  const [errors, setErrors] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onChange = (e) => {
    setUpdatedRoom({
      ...updatedRoom,
      [e.target.id]: e.target.value
    })
  }

  const onChangeOption = (e) => {
    setUpdatedRoom({
      ...updatedRoom,
      [e.target.id]: e.target.value
    })
  }

  const onBuildingChange = (e) => {
    setUpdatedRoom({
      ...updatedRoom,
      building: {
        name: e.target.value
      }
    })
  }

  const { id, number, seats, projector, building } = updatedRoom

  const onUpdate = async () => {
    setIsLoading(true)
    try {
      await updateRoom(updatedRoom)
      setLoading(false)
    } catch (e) {
      setIsLoading(false)
      setErrors('Failed to update room')
    }
  }

  const onDelete = async () => {
    setIsLoading(true)
    try {
      await deleteRoom(id)
      setLoading(false)
      removeRoom(id)
    } catch (e) {
      setIsLoading(false)
      setErrors('Failed to delete room')
    }
  }

  return (
    <tr>
      <td>
        <Input id='number' type='text' value={number} onChange={onChange} />
      </td>
      <td>
        <Input id='seats' type='text' value={seats} onChange={onChange} />
      </td>
      <td>
        <Input type='text' value={building?.name} onChange={onBuildingChange} />
      </td>
      <td>
        <Input id='projector' type='select' defaultValue={!!projector}>
          <option onChange={onChangeOption}>False</option>
          <option onChange={onChangeOption}>True</option>
        </Input>
      </td>
      <td>
        <Button className='update-room' title='Update' onClick={onUpdate} />
      </td>
      <td>
        <Button className='delete-room' title='Delete' onClick={onDelete} />
      </td>
    </tr>
  )
}

export default Room
