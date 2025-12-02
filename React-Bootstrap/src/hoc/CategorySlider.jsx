import React from 'react'
import { Row, Col } from 'react-bootstrap'

const CategorySlider = ({ items }) => {
  return (
    <Row className='g-4 justify-content-center'>
      {items.map((item, index) => (
        <Col
          key={index}
          className='text-center d-flex flex-column align-items-center'
        >
          <div
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: '0px 2px 10px rgba(0,0,0,0.1)'
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{ width: '70%', objectFit: 'contain' }}
            />

            <div
              style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                background: '#fff',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                color: '#6a1bff',
                border: '2px solid #eee',
                fontWeight: 600
              }}
            >
              +{item.count}
            </div>
          </div>

          <p className='mt-3 fw-medium'>{item.name}</p>
        </Col>
      ))}
    </Row>
  )
}

export default CategorySlider
