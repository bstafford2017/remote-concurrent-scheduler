import React, { useState } from 'react'
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Alert,
  Label,
  Input
} from 'reactstrap'
import styledComponents from 'styled-components'
import Button from '../components/Button'
import Spinner from '../components/Spinner'
import { updateUser } from '../Http/index'

const CardWrapper = styledComponents(Card)`
  background-color: #eee;
  color: #000;
  margin-top: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
`

const Settings = ({ user }) => {
  const [updatedUser, setUpdatedUser] = useState({
    id: user?.id,
    username: user?.username,
    password: user?.password,
    confirmPassword: user?.password,
    firstName: user?.firstName,
    lastName: user?.lastName,
    admin: user?.admin
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState('')
  const [inputErrors, setInputErrors] = useState('')

  const onChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.id]: e.target.value
    })
  }

  const onBlur = (e) => {
    if (!e.target.value) {
      setInputErrors('Please enter a valid ' + e.target.id)
    }
  }

  const submit = async () => {
    if (inputErrors) {
      return
    }

    setIsLoading(true)
    try {
      await updateUser(updatedUser)
      setIsLoading(false)
    } catch ({ message }) {
      setErrors('Failed updating user.')
      setIsLoading(false)
    }
  }

  const { username, password, firstName, lastName, admin } = updatedUser
  return (
    <>
      {isLoading && <Spinner />}
      <Col lg={{ size: 6, offset: 3 }}>
        <CardWrapper>
          <h2 style={{ textAlign: 'center' }}>User Settings</h2>
          <CardBody>
            <Alert color='danger' isOpen={!!inputErrors}>
              {inputErrors}
            </Alert>
            <Form>
              <Row>
                <Col sm={6}>
                  <FormGroup>
                    <Label for='firstName'>First Name</Label>
                    <Input
                      type='text'
                      value={firstName}
                      id='firstName'
                      disabled={isLoading}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  </FormGroup>
                </Col>
                <Col sm={6}>
                  <FormGroup>
                    <Label for='lastName'>Last Name</Label>
                    <Input
                      type='text'
                      value={lastName}
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
                      value={username}
                      id='username'
                      disabled={isLoading}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <FormGroup>
                    <Label for='password'>Password</Label>
                    <Input
                      type='password'
                      value={password}
                      id='password'
                      disabled={isLoading}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  </FormGroup>
                </Col>
                <Col sm={6}>
                  <FormGroup>
                    <Label for='confirmPassword'>Confirm Password</Label>
                    <Input
                      type='password'
                      value={password}
                      id='confirmPassword'
                      disabled={isLoading}
                      onChange={onChange}
                      onBlur={onBlur}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={{ size: 6, offset: 3 }}>
                  <FormGroup check>
                    <p style={{ textAlign: 'center' }}>
                      Admininstrator: {admin ? 'True' : 'False'}
                    </p>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Button
                  title={isLoading ? 'Processing...' : 'Update'}
                  className='col-sm-6 offset-sm-3 col-lg-4 offset-lg-4'
                  style={{ backgroundColor: '#00aa4f' }}
                  disabled={isLoading}
                  onClick={submit}
                />
              </Row>
            </Form>
          </CardBody>
        </CardWrapper>
      </Col>
    </>
  )
}

export default Settings
