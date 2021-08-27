import React, { useState, useEffect } from 'react'
import {
  Button,
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
  Col
} from 'reactstrap'
import { connect } from 'react-redux'
import { IRoom, IBuilding, IEvent } from '../../types'
import { Store } from '../../reducers'

interface IProps {
  display: boolean
  toggle: (e: React.MouseEvent) => void
  buildings: Array<IBuilding>
  events: Array<IEvent>
  selectedDate: Date
}

const MenuModal = ({
  display,
  toggle,
  buildings,
  events,
  selectedDate
}: IProps) => {
  const [displayCreate, setDisplayCreate] = useState(true)
  const [recur, setRecur] = useState(false)

  const toggleCreate = () => setDisplayCreate(true)
  const toggleView = () => setDisplayCreate(false)
  const toggleRecur = () => setRecur(!recur)

  useEffect(() => {
    // load
  }, [])

  const rooms: IRoom[] = []

  const dates = (
    <>
      <option selected disabled hidden>
        Select
      </option>
      <option value='6:00'>6:00 am</option>
      <option value='7:00'>7:00 am</option>
      <option value='8:00'>8:00 am</option>
      <option value='9:00'>9:00 am</option>
      <option value='10:00'>10:00 am</option>
      <option value='11:00'>11:00 am</option>
      <option value='12:00'>12:00 pm</option>
      <option value='13:00'>1:00 pm</option>
      <option value='14:00'>2:00 pm</option>
      <option value='15:00'>3:00 pm</option>
      <option value='16:00'>4:00 pm</option>
      <option value='17:00'>5:00 pm</option>
      <option value='18:00'>6:00 pm</option>
      <option value='19:00'>7:00 pm</option>
    </>
  )

  const create = (
    <Form>
      <Row form>
        <Col md={12}>
          <FormGroup>
            <Label for='title'>Title</Label>
            <Input type='text' id='title' />
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for='building'>Building</Label>
            <Input type='select' id='building'>
              {buildings.map((b: IBuilding) => (
                <option key={b.id}>{b.name}</option>
              ))}
            </Input>
          </FormGroup>
        </Col>
        <Col md={5}>
          <FormGroup>
            <Label for='room'>Room</Label>
            <Input type='select' id='room'>
              {rooms.map((r) => null)}
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for='date'>Date</Label>
            <Input type='date' id='date' />
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label for='startTime'>Start Time</Label>
            <Input type='select' id='startTime'>
              {dates}
            </Input>
          </FormGroup>
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label for='endTime'>End Time</Label>
            <Input type='select' id='endTiem'>
              {dates}
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <FormGroup check inline>
          <Label check>
            <Input type='checkbox' onClick={toggleRecur} /> Recurrance
          </Label>
        </FormGroup>
      </Row>
      <Row form>
        <FormGroup check inline>
          <Label check>
            <Input type='checkbox' disabled={!recur} /> Sun
          </Label>
        </FormGroup>
        <FormGroup check inline>
          <Label check>
            <Input type='checkbox' disabled={!recur} /> Mon
          </Label>
        </FormGroup>
        <FormGroup check inline>
          <Label check>
            <Input type='checkbox' disabled={!recur} /> Tues
          </Label>
        </FormGroup>
        <FormGroup check inline>
          <Label check>
            <Input type='checkbox' disabled={!recur} /> Wed
          </Label>
        </FormGroup>
        <FormGroup check inline>
          <Label check>
            <Input type='checkbox' disabled={!recur} /> Thurs
          </Label>
        </FormGroup>
        <FormGroup check inline>
          <Label check>
            <Input type='checkbox' disabled={!recur} /> Fri
          </Label>
        </FormGroup>
        <FormGroup check inline>
          <Label check>
            <Input type='checkbox' disabled={!recur} /> Sat
          </Label>
        </FormGroup>
        <FormGroup>
          <Label for='recurEnd'>End Recur Date</Label>
          <Input type='date' id='recurEnd' disabled={!recur} />
        </FormGroup>
      </Row>
      <Button>Close</Button>
      <Button>Create Event</Button>
    </Form>
  )

  const view = (
    <>
      <h3 className='view-header'>
        Events on {selectedDate.toLocaleDateString()}
      </h3>
      <div id='event-list'>
        {events.length === 0 ? (
          <h4 style={{ textAlign: 'center' }}>No events available</h4>
        ) : (
          events.map((e) => (
            <div className='view-item'>
              <div className='view-item-header'>{e.title}</div>
            </div>
          ))
        )}
      </div>
    </>
  )

  return (
    <>
      <Modal isOpen={display} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <Nav>
            <NavItem>
              <NavLink
                onClick={toggleCreate}
                style={{ color: '#009a44', cursor: 'pointer' }}
              >
                Create
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={toggleView}
                style={{ color: '#009a44', cursor: 'pointer' }}
              >
                View
              </NavLink>
            </NavItem>
          </Nav>
        </ModalHeader>
        <ModalBody>{displayCreate ? create : view}</ModalBody>
      </Modal>
    </>
  )
}

const mapStateToProps = (state: Store) => ({
  buildings: state.building.buildings,
  events: state.event.events
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(MenuModal)
