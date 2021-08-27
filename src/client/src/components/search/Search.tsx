import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormText,
  FormGroup,
  Table,
  Input,
  Button
} from 'reactstrap'
import SearchResult from './SearchResult'
import { IEvent } from '../../types'
import { searchEvent } from '../../actions/search'
import { Store } from '../../reducers'

interface IProps {
  results: IEvent[]
  searchEvent: Function
}

const Search = ({ results, searchEvent }: IProps) => {
  const [searchInput, setSearchInput] = useState('')

  const onChange = (e: any) => {
    setSearchInput(e.target.value)
  }

  const onSubmit = (e: any) => {
    e.preventDefault()
    searchEvent(searchInput)
  }

  return (
    <>
      <Col lg={{ size: 8, offset: 2 }}>
        <Card>
          <h2 style={{ textAlign: 'center' }}>Search Events</h2>
          <CardBody>
            <Form>
              <Row>
                <Col xs={{ size: 8, offset: 1 }}>
                  <FormGroup>
                    <Input
                      type='text'
                      placeholder='Enter title, building, room, date (i.e. YYYY/DD/MM) or username'
                      value={searchInput}
                      onChange={onChange}
                    />
                  </FormGroup>
                </Col>
                <Col xs={{ size: 2, offset: 1 }}>
                  <FormGroup>
                    <Col xs={2}>
                      <Button onClick={onSubmit}>Search</Button>
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
      <Col lg={{ size: 8, offset: 2 }}>
        <Card>
          <CardBody>
            <Table responsive>
              <thead>
                <tr>
                  <th scope='col'>Title</th>
                  <th scope='col'>Date</th>
                  <th scope='col'>Start Time</th>
                  <th scope='col'>Start Time</th>
                  <th scope='col'>Building</th>
                  <th scope='col'>Room</th>
                  <th scope='col'>Recur Weekdays</th>
                  <th scope='col'>Recur End Date</th>
                  <th scope='col'>Created By</th>
                </tr>
              </thead>
              <tbody>
                {results.map((e: IEvent) => (
                  <SearchResult event={e} />
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </>
  )
}

const mapStateToProps = (state: Store) => ({
  results: state.search
})

const mapDispatchToProps = {
  searchEvent
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
