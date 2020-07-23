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
import { createUser as create } from '../Http/index'

const CardWrapper = styledComponents(Card)`
  background-color: #eee;
  color: #000;
  margin-top: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
`

const CreateUser = ({ users, setUsers }) => {
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState(false)
  const [inputErrors, setInputErrors] = useState('')

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value
    })
  }

  const onClick = (e) => {
    e.preventDefault()
    createUser(user)
  }

  const onBlur = (e) => {
    if (!e.target.value) {
      setInputErrors('Please enter a valid ' + e.target.id)
    }
  }

  const createUser = async (user) => {
    if (inputErrors) {
      return
    }

    setIsLoading(true)
    try {
      await create(user)
      setIsLoading(false)
      setUsers([...users, user])
    } catch ({ message }) {
      setErrors('Error creating a user')
      setIsLoading(false)
    }
  }

  return (
    <>
      <Col lg={{ size: 6, offset: 3 }}>
        <CardWrapper>
          <h2 style={{ textAlign: 'center' }}>Create User</h2>
          <CardBody>
            <Alert color='danger' isOpen={!!inputErrors}>
              {inputErrors}
            </Alert>
            <Form>
              <Row>
                <Col xs={6}>
                  <FormGroup>
                    <Label for='firstName'>First Name</Label>
                    <Input
                      type='text'
                      id='firstName'
                      disabled={isLoading}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  </FormGroup>
                </Col>
                <Col xs={6}>
                  <FormGroup>
                    <Label for='lastName'>Last Name</Label>
                    <Input
                      type='text'
                      id='lastName'
                      disabled={isLoading}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for='username'>Username</Label>
                    <Input
                      type='text'
                      id='username'
                      disabled={isLoading}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for='password'>Password</Label>
                    <Input
                      type='password'
                      id='password'
                      disabled={isLoading}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for='confirmPassword'>Confirm Password</Label>
                    <Input
                      type='password'
                      id='confirmPassword'
                      disabled={isLoading}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm={{ size: 6, offset: 3 }}>
                  <FormGroup>
                    <Label for='admin'>Administrator</Label>
                    <Input
                      type='select'
                      id='admin'
                      disabled={isLoading}
                      onChange={onChange}
                      onBlur={onBlur}
                    >
                      <option disabled hidden>
                        Select
                      </option>
                      <option>False</option>
                      <option>True</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Button
                  title={isLoading ? 'Processing...' : 'Create'}
                  style={{ backgroundColor: '#00aa4f' }}
                  className='col-sm-6 offset-sm-3 col-lg-4 offset-lg-4'
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

export default CreateUser
