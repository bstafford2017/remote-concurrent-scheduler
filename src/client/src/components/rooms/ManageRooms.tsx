import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Col,
  Card,
  CardBody,
  Table,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  Alert
} from 'reactstrap'
import CreateRoom from '../rooms/CreateRoom'
import Room from '../rooms/Room'
import { IRoom, IBuilding } from '../../types'
import { loadRooms } from '../../actions/room'
import { Store } from '../../reducers'

interface IProps {
  rooms: Array<IRoom>
  loadRooms: Function
}

const ManageRooms = ({ rooms, loadRooms }: IProps) => {
  useEffect(() => {
    loadRooms()
  }, [])
  return (
    <>
      <Alert isOpen={false} text={''} />
      <CreateRoom buildings={rooms.map((r: IRoom) => r.building)} />
      <Col lg={{ size: 8, offset: 2 }}>
        <Card>
          <h2 style={{ textAlign: 'center' }}>Manage Rooms</h2>
          <CardBody>
            <Form>
              <Col xs={{ size: 5, offset: 4 }}>
                <FormGroup>
                  <Label for='building'>Building</Label>
                  <Input type='select' id='building'>
                    {rooms
                      .map((r: IRoom) => r.building)
                      .map((b: IBuilding) => b.name)
                      .map((name: string) => (
                        <option>{name}</option>
                      ))}
                  </Input>
                </FormGroup>
              </Col>
            </Form>
            <Table responsive={true}>
              <thead>
                <tr>
                  <th scope='col'>Room #</th>
                  <th scope='col'>Seats</th>
                  <th scope='col'>Projector</th>
                  <th scope='col'></th>
                  <th scope='col'></th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((r: IRoom) => (
                  <Room key={r.id} room={r} />
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </>
  )
}

const mapStateToProps = (state: Store) => ({
  rooms: state.room.rooms
})

const mapDispatchToProps = {
  loadRooms
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRooms)
