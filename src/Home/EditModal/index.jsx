import React, { useState, useEffect } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Nav,
  NavItem,
  NavLink,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Alert
} from 'reactstrap'
import Button from '../../components/Button'
import Spinner from '../../components/Spinner'
import { createEvent, getBuilding, getRooms } from '../../Http'

const EditModal = ({ close, selectedEvent }) => {
  const [allRooms, setAllRooms] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [event, setEvent] = useState(selectedEvent)
  const [rooms, setRooms] = useState([])
  const [buildings, setBuildings] = useState([])
  const [errors, setErrors] = useState('')

  const submit = async () => {
    const { startTime, endTime } = event

    if (errors) {
      return
    }

    if (startTime > endTime) {
      setErrors('End time cannot be before start time.')
      return
    }

    setIsLoading(true)
    try {
      await createEvent(event)
      setIsLoading(false)
    } catch (e) {
      setErrors('End time cannot be before start time.')
      setIsLoading(false)
    }
  }

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      try {
        const response = await getRooms()
        const { data } = response
        const { rooms = [] } = data
        const buildingsPromise = rooms.map((r) => getBuilding(r.building))
        const buildingsData = await Promise.all(buildingsPromise)
        const allBuildings = buildingsData.map((b) => b.data.building)
        setIsLoading(false)
        setRooms(rooms)
        setBuildings(allBuildings)
      } catch (e) {
        setIsLoading(false)
        setErrors('Failed to get rooms.')
      }
    })()
  }, [])

  const onChange = (e) => {
    setEvent({
      ...event,
      [e.target.id]: e.target.value
    })
  }

  const onChangeRecur = (day) => {
    setEvent({
      ...event,
      recur: [...event.recur, day.target.value === 'true' ? true : false]
    })
  }

  const onSelectBuilding = (e) => {
    onChange(e)
    const building = e.target.value
    setRooms(allRooms.filter((r) => r.building.name === building))
  }

  const {
    title = '',
    room: roomId = '',
    building: buildingId = '',
    startTime = '',
    endTime = '',
    startDate = ''
  } = selectedEvent
  const selectedRoom = rooms.find((r) => r.id === roomId) || {}
  const selectedBuilding = buildings.find((b) => b.id === buildingId) || {}

  const { number = '' } = selectedRoom
  const { name = '' } = selectedBuilding

  return (
    <Modal display={true} toggle={close} size='lg'>
      <ModalHeader toggle={close}>Edit Event</ModalHeader>
      <ModalBody>
        {isLoading && <Spinner />}
        <Alert color='danger' isOpen={!!errors} toggle={() => setErrors('')}>
          {errors}
        </Alert>
        {isLoading && <div style={{ height: '400px' }}></div>}
        {!isLoading && (
          <Form>
            <Row form>
              <Col md={12}>
                <FormGroup>
                  <Label for='title'>Title</Label>
                  <Input
                    type='text'
                    id='title'
                    value={title}
                    onChange={onChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for='building'>Building</Label>
                  <Input
                    type='select'
                    id='building'
                    value={name}
                    onChange={onSelectBuilding}
                  >
                    {buildings.map((b) => (
                      <option key={b.id}>{b.name}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for='room'>Room</Label>
                  <Input
                    type='select'
                    id='room'
                    value={number}
                    onChange={onChange}
                  >
                    {rooms.map((r) => (
                      <option key={r.id}>{r.number}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for='date'>Date</Label>
                  <Input
                    type='date'
                    id='date'
                    value={startDate}
                    onChange={onChange}
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for='startTime'>Start Time</Label>
                  <Input
                    type='time'
                    name='time'
                    value={startTime}
                    onChange={onChange}
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for='endTime'>End Time</Label>
                  <Input
                    type='time'
                    name='time'
                    value={endTime}
                    onChange={onChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <FormGroup>
                <Label for='exampleCheckbox'>Recur</Label>
                <div>
                  <FormGroup check inline>
                    <Input type='checkbox' onChange={onChangeRecur} />
                    <Label check>Sunday</Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input type='checkbox' onChange={onChangeRecur} />
                    <Label check>Monday</Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input type='checkbox' onChange={onChangeRecur} />
                    <Label check>Tuesday</Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input type='checkbox' onChange={onChangeRecur} />
                    <Label check>Wednesday</Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input type='checkbox' onChange={onChangeRecur} />
                    <Label check>Thursday</Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input type='checkbox' onChange={onChangeRecur} />
                    <Label check>Friday</Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input type='checkbox' onChange={onChangeRecur} />
                    <Label check>Saturday</Label>
                  </FormGroup>
                  <Input type='date' id='recurEnd' />
                </div>
              </FormGroup>
            </Row>
            <Button onClick={submit} title='Save Changes' />
          </Form>
        )}
      </ModalBody>
    </Modal>
  )
}

export default React.memo(EditModal)
