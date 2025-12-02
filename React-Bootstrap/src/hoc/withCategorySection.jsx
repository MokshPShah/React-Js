import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

const withCategorySection = WrappedComponent => {
  return function CategorySectionWrapper (props) {
    const { title, subtitle, onViewAll } = props

    return (
      <Container fluid className='py-120' style={{ background: '#f7f7f7' }}>
        <Container>
          <Row className='align-items-center mb-4'>
            <Col md={4}>
              <h6 className='text-purple fw-semibold'>{subtitle}</h6>
              <h2 className='fw-bold display-4'>{title}</h2>

              <Button
                variant='primary'
                className='px-4 py-2 mt-3'
                style={{ background: '#6a1bff', borderRadius: '10px' }}
                onClick={onViewAll}
              >
                VIEW ALL
              </Button>
            </Col>

            <Col md={8}>
              <WrappedComponent {...props} />
            </Col>
          </Row>
        </Container>
      </Container>
    )
  }
}

export default withCategorySection
