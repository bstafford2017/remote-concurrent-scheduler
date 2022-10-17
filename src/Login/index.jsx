import React, { useState, useEffect } from 'react'
import {
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { authStatus, login } from '../Http'
import Button from '../components/Button'
import Spinner from '../components/Spinner'
import { HOME_URL } from '../Routes'

const Login = ({ user, logOutAlert, dismissLogOutAlert }) => {
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState('')
  const [isLoadingLogin, setIsLoadingLogin] = useState(false)

  useEffect(() => {
    if (Object.keys(user).length != 0) {
      history.push(HOME_URL)
    }
  }, [user])

  const onChangeUsername = (e) => {
    setUsername(e.target.value)
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const onBlurUsername = (e) => {
    if (!username) {
      setErrors('Please enter a valid username')
    }
  }

  const onBlurPassword = (e) => {
    if (!password) {
      setErrors('Please enter a valid password')
    }
  }

  const attemptLogin = async () => {
    if (errors) {
      return
    }

    setIsLoadingLogin(true)
    try {
      const response = await login(username, password)
      const { data } = response
      const { user = {} } = data
      setIsLoadingLogin(false)
      if (!user) {
        setErrors('Invalid login.')
      } else {
        setUser(user)
        history.push(HOME_URL)
      }
    } catch ({ message }) {
      setIsLoadingLogin(false)
      setErrors(message)
    }
  }

  return (
    <>
      <Col
        xs={{ size: 12 }}
        sm={{ size: 10, offset: 1 }}
        md={{ size: 6, offset: 3 }}
        lg={{ size: 4, offset: 4 }}
      >
        <Card
          style={{
            backgroundColor: '#eee',
            color: '#000',
            margin: '15px',
            padding: '15px'
          }}
        >
          <h2 style={{ textAlign: 'center' }}>Login</h2>
          <CardBody>
            <Alert
              color='danger'
              isOpen={!!errors}
              toggle={() => setErrors('')}
            >
              {errors}
            </Alert>
            <Alert
              color='success'
              isOpen={logOutAlert}
              toggle={dismissLogOutAlert}
            >
              You have successfully logged out!
            </Alert>
            <Form>
              <FormGroup row>
                <Label for='username'>Username</Label>
                <Input
                  type='text'
                  id='username'
                  disabled={isLoadingLogin}
                  onChange={onChangeUsername}
                  onBlur={onBlurUsername}
                />
              </FormGroup>
              <FormGroup row>
                <Label for='password'>Password</Label>
                <Input
                  type='password'
                  id='password'
                  disabled={isLoadingLogin}
                  onChange={onChangePassword}
                  onBlur={onBlurPassword}
                />
              </FormGroup>
              <Col>
                <Button
                  title={isLoadingLogin ? 'Processing...' : 'Login'}
                  className='col-sm-6 offset-sm-6 col-lg-4 offset-lg-4'
                  onClick={attemptLogin}
                  disabled={isLoadingLogin}
                  style={{ backgroundColor: '#00aa4f' }}
                />
              </Col>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  )
}

export default Login
