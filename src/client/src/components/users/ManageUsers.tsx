import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card, CardBody, Table, FormText, Alert } from 'reactstrap'
import CreateUser from './CreateUser'
import User from './User'
import { IUser } from '../../types'
import { loadUsers } from '../../actions/user'
import { Store } from '../../reducers'

interface IProps {
  users: Array<IUser>
  loadUsers: Function
}

const ManageUsers = ({ users, loadUsers }: IProps) => {
  useEffect(() => {
    loadUsers()
  }, [])
  return (
    <>
      <Alert isOpen={false} text={''} />
      <Row>
        <CreateUser />
        <Col lg={{ size: 8, offset: 2 }}>
          <Card>
            <h2 style={{ textAlign: 'center' }}>Manage Users</h2>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th scope='col'>Username</th>
                    <th scope='col'>Password</th>
                    <th scope='col'>First Name</th>
                    <th scope='col'>Last Name</th>
                    <th scope='col'>Admin</th>
                    <th scope='col'></th>
                    <th scope='col'></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u: IUser) => (
                    <User key={u.id} user={u} />
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

const mapStateToProps = (state: Store) => ({
  users: state.user.users
})

const mapDispatchToProps = {
  loadUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers)
