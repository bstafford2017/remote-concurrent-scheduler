import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  Button
} from 'reactstrap'
import { IUser } from '../../types'
import { Store } from '../../reducers'

interface IProps {
  loggedUser: IUser
}

const Settings = ({ loggedUser }: IProps) => {
  const [user, setUser] = useState({
    username: loggedUser.username,
    password: loggedUser.password,
    confirmPassword: loggedUser.password,
    fname: loggedUser.fname,
    lname: loggedUser.lname,
    admin: loggedUser.admin
  })

  const onChange = (e: any) => {
    setUser({
      ...user,
      [e.target.id]: e.target.value
    })
  }

  const submit = () => {}

  const { username, password, fname, lname, admin } = user

  return (
    <Col lg={{ size: 6, offset: 3 }}>
      <Card>
        <h2 style={{ textAlign: 'center' }}>User Settings</h2>
        <CardBody>
          <Form>
            <Row>
              <Col>
                <FormGroup>
                  <Label for='username'>Username</Label>
                  <Input
                    type='text'
                    value={username}
                    id='username'
                    onChange={onChange}
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
                    onChange={onChange}
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
                    onChange={onChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <FormGroup>
                  <Label for='fname'>First Name</Label>
                  <Input
                    type='text'
                    value={fname}
                    id='fname'
                    onChange={onChange}
                  />
                </FormGroup>
              </Col>
              <Col sm={6}>
                <FormGroup>
                  <Label for='lname'>Last Name</Label>
                  <Input
                    type='text'
                    value={lname}
                    id='lname'
                    onChange={onChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={{ size: 6, offset: 3 }}>
                <FormGroup check>
                  <p>Admininstrator: {admin ? 'True' : 'False'}</p>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={{ size: 4, offset: 4 }}>
                <Button onClick={submit}>Update</Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Col>
  )
}

const mapStateToProps = (state: Store) => ({
  loggedUser: state.user.user
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
