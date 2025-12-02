import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Eye, Heart, ShoppingCart, Star } from 'lucide-react'
import headphone from '../assets/images/trending/headphone.png'
import mouse from '../assets/images/trending/mouse.png'
import pendrive from '../assets/images/trending/pendrive.png'
import smartWatch from '../assets/images/trending/smartWatch.png'

const WeeklyProducts = () => {
  const weeklyItems = [
    {
      category: 'Wireless device',
      name: 'Wireless headphones',
      price: '21.00',
      oldPrice: '25.00',
      salePercent: 20,
      image: `${headphone}`
    },
    {
      category: 'Waterproof',
      name: 'Wireless mouse',
      price: '18.00',
      oldPrice: '24.00',
      salePercent: 14,
      image: `${mouse}`
    },
    {
      category: 'Live program',
      name: 'Pen drivess',
      price: '10.00',
      oldPrice: '15.00',
      salePercent: 22,
      image: `${pendrive}`
    },
    {
      category: 'Waterproof watch',
      name: 'Smart watch',
      price: '32.00',
      oldPrice: '38.00',
      salePercent: 30,
      image: `${smartWatch}`
    }
  ]
  return (
    <Container fluid className='py-5' style={{ background: '#f6f6f6' }}>
      <Container>
        {/* Heading */}
        <div className='text-center mb-4'>
          <h6 className='text-primary fw-semibold'>Featured  collection</h6>
          <h2 className='fw-bold'>Weekly product</h2>
        </div>

        <Row className='justify-content-center g-4'>
          {weeklyItems.map((product, index) => (
            <Col key={index} md={3}>
              <div
                className='product-card p-3 bg-white'
                style={{
                  borderRadius: '10px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: '0.3s'
                }}
              >
                {/* Hover Icons */}
                <div className='hover-icons'>
                  <div className='icon-group d-flex gap-2'>
                    <div className='icon-box'>
                      <Eye size={18} />
                    </div>
                    <div className='icon-box'>
                      <ShoppingCart size={18} />
                    </div>
                    <div className='icon-box'>
                      <Heart size={18} />
                    </div>
                  </div>
                </div>

                {/* Product Image */}
                <div className='text-center mb-3'>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '70%', height: 'auto' }}
                  />
                </div>

                {/* Text */}
                <p className='text-muted small mb-1'>{product.category}</p>
                <h6 className='fw-semibold'>{product.name}</h6>

                {/* Pricing */}
                <p>
                  <span className='fw-bold'>${product.price}</span>
                  <span className='text-muted text-decoration-line-through ms-2'>
                    ${product.oldPrice}
                  </span>
                </p>

                {/* Rating + Sale */}
                <div className='d-flex justify-content-between align-items-center'>
                  <div className='text-warning'>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} fill='#6a1bff' stroke='#6a1bff' />
                    ))}
                  </div>

                  <span
                    className='badge'
                    style={{
                      background: '#19c37d',
                      color: 'white',
                      padding: '6px 10px',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  >
                    SALE {product.salePercent}%
                  </span>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* VIEW ALL */}
        <div className='text-center mt-4'>
          <Button
            style={{
              background: '#6a1bff',
              border: 'none',
              padding: '10px 35px',
              borderRadius: '8px'
            }}
          >
            VIEW ALL ITEM
          </Button>
        </div>
      </Container>
    </Container>
  )
}

export default WeeklyProducts
