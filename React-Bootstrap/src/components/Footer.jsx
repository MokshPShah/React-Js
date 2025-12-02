import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import Logo from '../assets/images/Logo.png'
import google from '../assets/images/footer/google.png'
import appstore from '../assets/images/footer/appstore.png'
import visa from '../assets/images/footer/visa.png'
import mastercard from '../assets/images/footer/mastercard.png'
import paypal from '../assets/images/footer/paypal.png'
import discover from '../assets/images/footer/discover.png'

const Footer = () => {
  return (
    <footer>
      <Container className='pt-5 pb-4'>
        <Row className='mb-5'>
          {/* Left Column (Logo + Desc + Download) */}
          <Col md={3} className='mb-4'>
            <div className='d-flex align-items-center mb-3'>
              <img src={Logo} alt='logo' />
            </div>

            <p
              className='text-muted'
              style={{
                fontSize: '15px',
                lineHeight: '26px',
                maxWidth: '260px'
              }}
            >
              There are many variations of passages of lorem Ipsum available,
              but the majority ..
            </p>

            <h6 className='fw-semibold mt-4 mb-3' style={{ fontSize: '16px' }}>
              Download for app
            </h6>

            <div className='d-flex gap-3 mt-2'>
              <img
                src={google}
                alt='google'
                style={{ width: '140px', cursor: 'pointer' }}
              />
              <img
                src={appstore}
                alt='appstore'
                style={{ width: '140px', cursor: 'pointer' }}
              />
            </div>
          </Col>

          {/* Help With */}
          <Col md={2} className='mb-4'>
            <h6 className='fw-semibold mb-4' style={{ fontSize: '18px' }}>
              Help with
            </h6>
            <ul className='footer-list'>
              <li>Contact us</li>
              <li>Terms & conditions</li>
              <li>Track your order</li>
              <li>Our guarantee</li>
              <li>Guide des tailles</li>
            </ul>
          </Col>

          {/* Information */}
          <Col md={2} className='mb-4'>
            <h6 className='fw-semibold mb-4' style={{ fontSize: '18px' }}>
              Information
            </h6>
            <ul className='footer-list'>
              <li>About story</li>
              <li>Privacy policy</li>
              <li>Return policy</li>
              <li>Payment policy</li>
              <li>We our brand</li>
            </ul>
          </Col>

          {/* Top category */}
          <Col md={2} className='mb-4'>
            <h6 className='fw-semibold mb-4' style={{ fontSize: '18px' }}>
              Top category
            </h6>
            <ul className='footer-list'>
              <li>Wireless headphone</li>
              <li>Bluetooth speakers</li>
              <li>Portable devices</li>
              <li>Monio live camera</li>
              <li>Movie projector T6</li>
            </ul>
          </Col>

          {/* Contact info */}
          <Col md={3} className='mb-4'>
            <h6 className='fw-semibold mb-4' style={{ fontSize: '18px' }}>
              Contact info
            </h6>

            <p className='text-muted mb-2' style={{ fontSize: '15px' }}>
              Phone: <strong>+1 234 567 890</strong>
            </p>

            <p className='text-muted mb-2' style={{ fontSize: '15px' }}>
              Email: <strong>info@domain.com</strong>
            </p>

            <p
              className='text-muted'
              style={{ fontSize: '15px', lineHeight: '25px' }}
            >
              401 Broadway, 24th floor,
              <br />
              orchard view, london, UK
            </p>
          </Col>
        </Row>

        {/* Payment Icons */}
        <div className='d-flex gap-3 mb-5 mt-4'>
          <img src={visa} alt='visa' style={{ width: '55px' }} />
          <img src={mastercard} alt='master' style={{ width: '55px' }} />
          <img src={paypal} alt='paypal' style={{ width: '55px' }} />
          <img src={discover} alt='discover' style={{ width: '55px' }} />
        </div>

        {/* Newsletter */}
        <div className='py-4 mb-3 newsletter' style={{}}>
          <Row className='align-items-center'>
            <Col md={4} className='mb-3 mb-md-0'>
              <h5 className='fw-semibold mb-0' style={{ fontSize: '22px' }}>
                Subscribe newsletter
              </h5>
            </Col>

            <Col md={8}>
              <div className='d-flex'>
                <Form.Control
                  placeholder='Enter your email'
                  className='py-3'
                  style={{
                    borderRadius: '10px 0 0 10px',
                    fontSize: '15px'
                  }}
                />
                <Button className='footer-frm-btn'>SEND</Button>
              </div>
            </Col>
          </Row>
        </div>

        <p
          className='text-center text-muted mt-3 mb-2'
          style={{ fontSize: '15px' }}
        >
          © 2025 Power by spacingtech template
        </p>
      </Container>
    </footer>
  )
}

export default Footer
