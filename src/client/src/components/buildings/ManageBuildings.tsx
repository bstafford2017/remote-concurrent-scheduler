import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card, CardBody, FormText, Alert, Table } from 'reactstrap'
import CreateBuilding from './CreateBuilding'
import Building from './Building'
import { IBuilding } from '../../types'
import { loadBuildings } from '../../actions/building'
import { Store } from '../../reducers'

interface IProps {
  buildings: Array<IBuilding>
  loadBuildings: Function
}

const ManageBuildings = ({ buildings, loadBuildings }: IProps) => {
  useEffect(() => {
    loadBuildings()
  }, [])

  return (
    <>
      <Alert isOpen={false} text={''} />
      <Row>
        <CreateBuilding />
        <Col lg={{ size: 5, offset: 1 }}>
          <Card>
            <h2 style={{ textAlign: 'center' }}>Manage Buildings</h2>
            <CardBody>
              <Table responsive={true}>
                <thead>
                  <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'></th>
                    <th scope='col'></th>
                  </tr>
                </thead>
                <tbody>
                  {buildings.map((b: IBuilding) => (
                    <Building key={b.id} building={b} />
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
  buildings: state.building.buildings
})

const mapDispatchToProps = {
  loadBuildings
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageBuildings)
