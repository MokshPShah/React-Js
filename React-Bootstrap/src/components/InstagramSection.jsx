import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Instagram } from 'lucide-react'
import insta1 from '../assets/images/insta/insta1.png'
import insta2 from '../assets/images/insta/insta2.png'
import insta3 from '../assets/images/insta/insta3.png'
import insta4 from '../assets/images/insta/insta4.png'
import insta5 from '../assets/images/insta/insta5.png'
import insta6 from '../assets/images/insta/insta6.png'

const InstagramSection = () => {
  const images = [
    `${insta1}`,
    `${insta2}`,
    `${insta3}`,
    `${insta4}`,
    `${insta5}`,
    `${insta6}`
  ]

  return (
    <Container fluid className='py-5 text-center'>
      <p className='text-primary fw-semibold'>Our instagram shop</p>
      <h2 className='fw-bold mb-4'>Follow on instagram</h2>

      <Row className='justify-content-center g-3'>
        {images.map((img, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={2}>
            <div className='insta-box'>
              <img src={img} alt={`Instagram ${index}`} className='insta-img' />

              {/* Hover Overlay */}
              <div className='insta-overlay'>
                <div className='insta-icon'>
                  <Instagram size={26} color='white' />
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <Button className='mt-4 px-4 py-2 insta-btn'># ELECTON TEMPLATE</Button>

      {/* CSS */}
      <style>
        {`
          .insta-box {
            position: relative;
            border-radius: 14px;
            overflow: hidden;
            cursor: pointer;
          }

          .insta-img {
            width: 100%;
            height: 180px;
            object-fit: cover;
            display: block;
            border-radius: 14px;
            transition: transform 0.4s ease;
          }

          .insta-box:hover .insta-img {
            transform: scale(1.05);
          }

          .insta-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.45);
            opacity: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 0.3s ease;
            border-radius: 14px;
          }

          .insta-box:hover .insta-overlay {
            opacity: 1;
          }

          .insta-icon {
            background: rgba(255,255,255,0.25);
            padding: 14px;
            border-radius: 50%;
            backdrop-filter: blur(3px);
          }
        `}
      </style>
    </Container>
  )
}

export default InstagramSection
