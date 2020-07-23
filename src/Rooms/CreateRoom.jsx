import React, { useState } from 'react'
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap'
import styledComponents from 'styled-components'
import Button from '../components/Button'
import { createRoom as create } from '../Http/index'

const CardWrapper = styledComponents(Card)`
  background-color: #eee;
  color: #000;
  margin-top: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
`

const CreateRoom = ({ rooms, setRooms }) => {
  const [room, setRoom] = useState({
    building: {}
  })
  const [selectedBuilding, setSelectedBuilding] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState('')
  const [inputErrors, setInputErrors] = useState('')

  const onChange = (e) => {
    setRoom({
      ...room,
      [e.target.id]: e.target.value
    })
  }

  const onClick = (e) => {
    e.preventDefault()
    createRoom(room)
  }

  const onChangeBuilding = (e) => {
    setRoom({
      ...room,
      building: {
        name: e.target.value
      }
    })
  }

  const onBlur = (e) => {
    if (!e.target.value) {
      setInputErrors('Please enter a valid ' + e.target.id)
    }
  }

  const createRoom = async (room) => {
    if (inputErrors) {
      return
    }

    setIsLoading(true)
    try {
      await create(room)
      setIsLoading(false)
      setRooms([...rooms, room])
    } catch (e) {
      setErrors('Error creating a room')
      setIsLoading(false)
    }
  }

  return (
    <>
      <Alert color='danger' isOpen={!!errors} toggle={() => setErrors('')}>
        {errors}
      </Alert>
      <Col lg={{ size: 6, offset: 3 }}>
        <CardWrapper>
          <h2 style={{ textAlign: 'center' }}>Create Room</h2>
          <CardBody>
            <Alert color='danger' isOpen={!!inputErrors}>
              {inputErrors}
            </Alert>
            <Form>
              <Row>
                <Col xs={6}>
                  <FormGroup>
                    <Label for='building'>Building</Label>
                    <Input
                      type='text'
                      id='building'
                      disabled={isLoading}
                      onChange={onChangeBuilding}
                      onBlur={onBlur}
                    />
                  </FormGroup>
                </Col>
                <Col xs={6}>
                  <FormGroup>
                    <Label for='number'>Room #</Label>
                    <Input
                      type='text'
                      id='number'
                      disabled={isLoading}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={6}>
                  <FormGroup>
                    <Label for='seats'>Seats</Label>
                    <Input
                      type='text'
                      id='seats'
                      disabled={isLoading}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  </FormGroup>
                </Col>
                <Col xs={6}>
                  <FormGroup>
                    <Label for='projector'>Projector</Label>
                    <Input
                      type='select'
                      id='projector'
                      disabled={isLoading}
                      onChange={onChange}
                      onBlur={onBlur}
                      defaultValue='-1'
                    >
                      <option disabled hidden value='-1'>
                        Select
                      </option>
                      <option value='0'>False</option>
                      <option value='1'>True</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Button
                  title={isLoading ? 'Processing...' : 'Create'}
                  className='col-sm-6 offset-sm-3 col-lg-4 offset-lg-4'
                  style={{ backgroundColor: '#00aa4f' }}
                  disabled={isLoading}
                  onClick={onClick}
                />
              </Row>
            </Form>
          </CardBody>
        </CardWrapper>
      </Col>
    </>
  )
}

export default CreateRoom
