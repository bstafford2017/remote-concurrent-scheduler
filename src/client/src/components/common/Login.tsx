import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert
} from 'reactstrap'
import { ILogin, IUser } from '../../types'
import { login, authenticated } from '../../actions/user'
import { useHistory } from 'react-router-dom'
import { setErrors, clearErrors } from '../../actions/error'
import { Store } from '../../reducers'

const initialState: ILogin = {
  username: '',
  password: ''
}

interface IProps {
  login: Function
  errors: string | null
  setErrors: Function
  authenticated: Function
  tokenUser: IUser
}

const Login = ({
  login,
  errors,
  setErrors,
  authenticated,
  tokenUser
}: IProps) => {
  const history = useHistory()
  const [user, setUser]: [ILogin, Function] = useState(initialState)
  const [showAlert, setShowAlert] = useState(true)

  useEffect(() => {
    authenticated()
  }, [])

  const onChange = (e: any) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value
    })
  }

  const attemptLogin = async (e: any) => {
    e.preventDefault()
    try {
      if (user.username && user.password) {
        await login(user)
        history.push('/home')
      } else if (!user.username && user.password) {
        setErrors('Please enter a username')
      } else if (user.username && !user.password) {
        setErrors('Please enter a password')
      } else {
        setErrors('Please enter a username and password')
      }
    } catch (e) {
      setErrors(e)
      console.log(e)
    }
  }

  const clearAlert = () => {
    setShowAlert(false)
    clearErrors()
  }

  if (tokenUser) {
    history.push('/home')
  }

  return (
    <Col
      xs={{ size: 12 }}
      sm={{ size: 10, offset: 1 }}
      md={{ size: 6, offset: 3 }}
      lg={{ size: 4, offset: 4 }}
    >
      <Card>
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        <CardBody>
          <Alert
            color='danger'
            isOpen={showAlert && !!errors}
            toggle={clearAlert}
          >
            {errors}
          </Alert>
          <Form>
            <FormGroup row>
              <Label for='username'>Username</Label>
              <Input type='text' id='username' onChange={onChange} />
            </FormGroup>
            <FormGroup row>
              <Label for='password'>Password</Label>
              <Input type='password' id='password' onChange={onChange} />
            </FormGroup>
            <Col sm={{ size: 6, offset: 3 }} lg={{ size: 4, offset: 4 }}>
              <Button onClick={attemptLogin}>Login</Button>
            </Col>
          </Form>
        </CardBody>
      </Card>
    </Col>
  )
}

Login.propTypes = {}

const mapStateToProps = (state: Store) => ({
  errors: state.error.msg,
  tokenUser: state.user.user
})

const mapDispatchToProps = {
  login,
  setErrors,
  authenticated
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
