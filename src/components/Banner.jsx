import React from 'react'
import { Link } from 'react-router-dom'
import { Col } from 'reactstrap'

const Banner = () => {
  return (
    <Link to='home'>
      <Col sm={{ size: 6, offset: 3 }} md={{ size: 4, offset: 4 }}>
        <img
          className='img-fluid'
          src='images/new_logo.png'
          alt='University of North Dakota'
        />
      </Col>
    </Link>
  )
}

export default Banner
