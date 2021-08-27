import React, { useEffect, useState } from 'react'
import { Col, FormGroup, Label, Input } from 'reactstrap'
import { connect } from 'react-redux'
import { IBuilding, IRoom } from '../../types'
import { loadBuildings } from '../../actions/building'
import { loadRooms } from '../../actions/room'
import { Store } from '../../reducers'

interface IProps {
  loadBuildings: Function
  buildings: Array<IBuilding>
  loadRooms: Function
  rooms: Array<IRoom>
}

const Filter = ({ loadBuildings, buildings, loadRooms, rooms }: IProps) => {
  const [selectedBuilding, setSelectedBuilding] = useState('')
  const [selectedRoom, setSelectedRoom] = useState('')

  const handleBuildingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedBuilding(e.target.value)
  }

  const handleRoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRoom(e.target.value)
  }

  useEffect(() => {
    loadBuildings()
    loadRooms(selectedBuilding)
  }, [selectedBuilding, selectedRoom])

  return (
    <div
      id='filter'
      className='form-row pb-3'
      style={{ margin: 0, background: 'black', color: '#00aa4f' }}
    >
      <Col xs={{ size: 3, offset: 3 }}>
        <FormGroup row>
          <Label for='filter-building'>Building</Label>
          <Input
            type='select'
            defaultValue='default'
            onChange={handleBuildingChange}
          >
            <option>All Buildings</option>
            {buildings.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </Input>
        </FormGroup>
      </Col>
      <Col xs={{ size: 3, offset: 1 }}>
        <FormGroup row>
          <Label for='filter-room'>Room</Label>
          <Input
            type='select'
            defaultValue='default'
            onChange={handleRoomChange}
          >
            <option>All Rooms</option>
            {rooms.map((r) => (
              <option key={r.id} value={r.id}>
                {r.number}
              </option>
            ))}
          </Input>
        </FormGroup>
      </Col>
    </div>
  )
}

const mapStateToProps = (state: Store) => ({
  buildings: state.building.buildings,
  rooms: state.room.rooms
})

const mapDispatchToProps = {
  loadBuildings,
  loadRooms
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
