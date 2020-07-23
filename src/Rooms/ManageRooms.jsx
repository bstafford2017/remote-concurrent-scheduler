import React, { useEffect, useRef, useState } from 'react'
import {
  Col,
  Card,
  CardBody,
  Table,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap'
import CreateRoom from './CreateRoom'
import Room from '.'
import { getRooms, deleteRoom, getBuilding } from '../Http/index'
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

const ManageRooms = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState('')
  const [rooms, setRooms] = useState([])
  const [buildings, setBuildings] = useState([])
  const [selectedBuilding, setSelectedBuilding] = useState({})
  const mounted = useRef(false)

  useEffect(() => {
    mounted.current = true
    ;(async () => {
      setIsLoading(true)
      try {
        const response = await getRooms()
        const { data = {} } = response
        const { rooms = [] } = data
        const buildingsPromise = rooms.map((r) => getBuilding(r.building))
        const buildingsData = await Promise.all(buildingsPromise)
        const allBuildings = buildingsData.map((b) => b.data.building)
        if (mounted.current) {
          setIsLoading(false)
          setRooms(rooms)
          setBuildings(allBuildings)
        }
      } catch (e) {
        if (mounted.current) {
          setIsLoading(false)
          setErrors('Failed to get buildings.')
        }
      }
    })()
    return () => {
      mounted.current = false
    }
  }, [])

  const removeRoom = async (id) => {
    setIsLoading(true)
    try {
      setIsLoading(true)
      await deleteRoom(id)
      setLoading(false)
      setRooms(rooms.filter((r) => r.id !== id))
    } catch ({ message }) {
      setIsLoading(false)
      setErrors('Error removing a room')
    }
  }

  const onSelectBuilding = (e) => {
    setSelectedBuilding({})
  }

  return (
    <>
      <Alert color='danger' isOpen={!!errors} toggle={() => setErrors('')}>
        {errors}
      </Alert>
      <CreateRoom rooms={rooms} setRooms={setRooms} />
      <Col md={{ size: 8, offset: 2 }} lg={{ size: 12, offset: 0 }}>
        <CardWrapper>
          <h2 style={{ textAlign: 'center' }}>Manage Rooms</h2>
          <CardBody>
            <Dots display={isLoading} />
            {!isLoading && (
              <>
                <Form>
                  <Col xs={{ size: 5, offset: 4 }}>
                    <FormGroup>
                      <Label for='building'>Building</Label>
                      <Input type='select' id='building'>
                        {buildings.map((b, i) => (
                          <option key={i} onClick={onSelectBuilding}>
                            {b.name}
                          </option>
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
                      <th scope='col'>Building</th>
                      <th scope='col'>Projector</th>
                      <th scope='col'></th>
                      <th scope='col'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map((r, i) => (
                      <Room key={i} room={r} removeRoom={removeRoom} />
                    ))}
                  </tbody>
                </Table>
              </>
            )}
          </CardBody>
        </CardWrapper>
      </Col>
    </>
  )
}

export default ManageRooms
