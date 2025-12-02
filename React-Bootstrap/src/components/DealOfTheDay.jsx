import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import dealBanner from '../assets/images/dealBanner.png'

const DealOfTheDay = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const end = new Date(endDate).getTime()
      const diff = end - now

      if (diff <= 0) {
        clearInterval(timer)
        return
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [endDate])

  return (
    <Container className='py-5'>
      <div
        style={{
          backgroundImage: `url(${dealBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '25px',
          padding: '60px 30px',
          color: 'white'
        }}
      >
        <Row className='justify-content-center text-center'>
          <Col md={8}>
            <p className='fw-semibold mb-1' style={{ color: '#ffe600' }}>
              Every day shopping
            </p>

            <h2 className='fw-bold mb-4'>Deal of the days</h2>

            <div className='d-flex justify-content-center gap-3 flex-wrap'>
              <div className='timer-box'>
                <h4>{timeLeft.days}</h4>
                <p>DAY</p>
              </div>

              <div className='timer-box'>
                <h4>{timeLeft.hours}</h4>
                <p>HRS</p>
              </div>

              <div className='timer-box'>
                <h4>{timeLeft.minutes}</h4>
                <p>MIN</p>
              </div>

              <div className='timer-box'>
                <h4>{timeLeft.seconds}</h4>
                <p>SEC</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default DealOfTheDay
