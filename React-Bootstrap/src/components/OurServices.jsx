import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Truck, Wallet, Undo2, Gift } from 'lucide-react'

const iconMap = {
  truck: Truck,
  wallet: Wallet,
  return: Undo2,
  gift: Gift
}

const FeatureIcons = () => {
  const featureItems = [
    {
      icon: 'truck',
      title: 'Worldwide shipping',
      subtitle: 'The generated is there was !'
    },
    {
      icon: 'wallet',
      title: 'Secure payment',
      subtitle: 'The generated is there was !'
    },
    {
      icon: 'return',
      title: 'Return method',
      subtitle: 'The generated is there was !'
    },
    {
      icon: 'gift',
      title: 'Best gift voucher',
      subtitle: 'The generated is there was !'
    }
  ]
  return (
    <Container fluid className='py-80 overflow-x-hidden'>
      <Row className='justify-content-center text-center g-5'>
        {featureItems.map((item, index) => {
          const IconComponent = iconMap[item.icon]

          return (
            <Col key={index} md={3}>
              <div className='position-relative d-inline-block icon-wrapper'>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    background: '#ffe600',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '-10px',
                    left: '20px',
                    zIndex: 1
                  }}
                ></div>

                {/* Icon */}
                <div
                  className='icon-flip'
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    transition: 'transform 0.4s ease'
                  }}
                >
                  <IconComponent size={48} strokeWidth={1.7} color='#6a1bff' />
                </div>
              </div>

              <h5 className='mt-3 fw-semibold'>{item.title}</h5>
              <p className='text-muted'>{item.subtitle}</p>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default FeatureIcons
