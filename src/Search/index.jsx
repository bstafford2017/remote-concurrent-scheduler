import React, { useState } from 'react'
import {
  Col,
  Row,
  Card,
  CardBody,
  Form,
  FormGroup,
  Table,
  Input,
  Alert
} from 'reactstrap'
import Result from './Result'
import Spinner from '../components/Spinner'
import Button from '../components/Button'
import useSearch from '../Hooks/useSearch'

const Search = () => {
  const [results, loading, errors, search] = useSearch()

  const [searchInput, setSearchInput] = useState('')
  const [inputErrors, setInputErrors] = useState('')

  const onBlur = (e) => {
    if (!e.target.value) {
      setInputErrors('Please enter a valid search')
    }
  }

  const showTable = !loading && results.length > 0
  const showNoResults = !loading && results.length === 0

  return (
    <>
      <Col lg={{ size: 8, offset: 2 }}>
        <Card
          style={{
            backgroundColor: '#eee',
            color: '#000',
            padding: '15px',
            margin: '15px'
          }}
        >
          <h2 style={{ textAlign: 'center' }}>Search Events</h2>
          <CardBody>
            <Alert
              color='danger'
              isOpen={!!inputErrors}
              toggle={() => setInputErrors('')}
            >
              {inputErrors}
            </Alert>
            <Form>
              <Row>
                <Col xs={{ size: 8, offset: 1 }}>
                  <FormGroup>
                    <Input
                      type='text'
                      placeholder='Enter title, building, room, date (i.e. YYYY/DD/MM) or username'
                      value={searchInput}
                      disabled={loading}
                      onChange={(e) => setSearchInput(e.target.value)}
                      onBlur={onBlur}
                    />
                  </FormGroup>
                </Col>
                <Col xs={{ size: 2, offset: 1 }}>
                  <FormGroup>
                    <Col xs={2}>
                      <Button
                        className='delete-room'
                        style={{ backgroundColor: '#00aa4f' }}
                        disabled={loading}
                        title={loading ? 'Processing...' : 'Search'}
                        onClick={async () => await search(searchInput)}
                      />
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
      {loading && <Spinner />}
      {showTable && (
        <Col lg={{ size: 12 }}>
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
                  {results.map((e, i) => (
                    <Result key={i} event={e} />
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      )}
      {showNoResults && <h3 style={{ textAlign: 'center' }}>No results</h3>}
    </>
  )
}

export default Search
