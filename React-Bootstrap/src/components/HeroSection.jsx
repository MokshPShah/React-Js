import React from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import CameraImg from '../assets/images/camera.png' // ← your DSLR image

const HeroBanner = () => {
  return (
    <div
      className='hero-bg d-flex align-items-center position-relative py-5'
      style={{
        backgroundImage: `url(${CameraImg})`
      }}
    >
      <Container>
        <Row>
          <Col md={6} className='text-white'>
            <div className='discount-box mb-4'>Get up to discount 80% off</div>
            <h1 className='fw-bold display-3'>
              DSLR 360 <br />
              CAMERA
            </h1>
            <p className='mt-3 fs-5'>
              <span className='text-warning fw-bold'>100% trusted</span>{' '}
              electronics gadget
            </p>
            <Button className='mt-4 px-4 py-2 fw-bold bg-warning border-0 text-dark'>
              ONLINE COLLECTION
            </Button>
          </Col>
        </Row>
      </Container>
      <div className='indicator-container'>
        <div className='indicator active'>1</div>
        <div className='indicator-line text-white'></div>
        <div className='indicator text-white'>2</div>
        <div className='indicator-line text-white'></div>
        <div className='indicator text-white'>3</div>
      </div>
      <div className='decor-circle circle1'></div>
      <div className='decor-circle circle2'></div>
    </div>
  )
}

export default HeroBanner
