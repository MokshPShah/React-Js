import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import samsung from '../assets/images/brand/samsung.png'
import acer from '../assets/images/brand/acer.png'
import lenovo from '../assets/images/brand/lenovo.png'
import sony from '../assets/images/brand/sony.png'
import asus from '../assets/images/brand/asus.png'
import logitech from '../assets/images/brand/logitech.png'

const BrandStrip = () => {
  const brands = [
    `${samsung}`,
    `${acer}`,
    `${lenovo}`,
    `${sony}`,
    `${asus}`,
    `${logitech}`
  ]

  return (
    <div className='brand-container'>
      <Container>
        <Row className='justify-content-center align-items-center text-center g-4'>
          {brands.map((logo, index) => (
            <Col key={index} xs={6} sm={4} md={2}>
              <img src={logo} alt='Brand' className='brand-img' />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default BrandStrip
