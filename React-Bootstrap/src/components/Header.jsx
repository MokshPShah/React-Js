import React from 'react'
import {
  Facebook,
  Instagram,
  Search,
  Headphones,
  UserRound,
  Menu,
  Heart,
  ShoppingBag
} from 'lucide-react'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Logo from '../assets/images/Logo.png'

const Header = () => {
  return (
    <>
      <div className='bg-white py-2 border-bottom'>
        <div className='d-flex justify-content-around align-items-center'>
          <span className='text-muted small'>
            Email : Electondemo@gmail.com
          </span>
          <span className='text-muted small'>
            Free worldwide & Free return for above uk
            <span className='text-purple fw-bold'> Shop now!</span>
          </span>
          <div className='d-flex gap-4'>
            <span className='d-flex align-items-center gap-1 small'>
              <Facebook size={18} /> 90K Followers
            </span>
            <span className='d-flex align-items-center gap-1 small'>
              <Instagram size={18} /> 60K Followers
            </span>
          </div>
        </div>
      </div>
      <div className='bg-light py-3'>
        <div className='d-flex justify-content-evenly align-items-center'>
          <img src={Logo} alt='Logo' style={{ height: '45px' }} />
          <div className='d-flex w-50'>
            <input
              type='text'
              className='form-control rounded-start-pill'
              placeholder='Find our search'
            />
            <Button className='rounded-end-pill bg-purple border-0 px-4 d-flex align-items-center justify-content-center'>
              <Search size={20} />
            </Button>
          </div>
          <div className='d-flex gap-5'>
            <div className='d-flex align-items-center gap-2'>
              <Headphones size={28} color='#6c3ce9' />
              <div>
                <div className='text-muted small'>Hotline number</div>
                <div className='fw-semibold'>+2600 0500 2600</div>
              </div>
            </div>
            <div className='d-flex align-items-center gap-2'>
              <UserRound size={28} color='#6c3ce9' />
              <div>
                <div className='text-muted small'>My account</div>
                <a
                  href='#'
                  className='fw-semibold text-dark text-decoration-none'
                >
                  Login & Register
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Navbar
        expand='lg'
        style={{ backgroundColor: '#f2e600' }}
        className='py-3 px-5'
      >
        <Nav className='d-flex align-items-center gap-2 fw-bold'>
          <Menu size={22} />
          TRENDING CATEGORY
        </Nav>
        <span style={{ cursor: 'pointer' }}>▼</span>
        <Nav className='mx-auto d-flex gap-4 fw-semibold'>
          <Nav.Link href='#' className='text-dark'>
            HOME
          </Nav.Link>
          <Nav.Link href='#' className='text-dark'>
            SHOP
          </Nav.Link>
          <Nav.Link href='#' className='text-dark'>
            PRODUCT
          </Nav.Link>
          <Nav.Link href='#' className='text-dark'>
            BLOGS
          </Nav.Link>
          <Nav.Link href='#' className='text-dark'>
            CONTACT US
          </Nav.Link>
          <Nav.Link href='#' className='text-dark'>
            PAGES
          </Nav.Link>
          <Nav.Link href='#' className='text-dark'>
            BUY ELECTON
          </Nav.Link>
        </Nav>
        <div className='d-flex align-items-center gap-4'>
          <div className='d-flex align-items-center gap-1 fw-semibold'>
            <Heart size={18} /> My wishlist
          </div>
          <div className='bg-dark text-white px-3 py-2 rounded d-flex align-items-center gap-2 fw-semibold'>
            <ShoppingBag size={18} />
            My cart{' '}
            <span className='bg-purple rounded-pill px-2 py-1 small'>04</span>
          </div>
        </div>
      </Navbar>
    </>
  )
}

export default Header
