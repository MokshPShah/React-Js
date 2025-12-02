import Header from './components/Header'
import HeroSection from './components/HeroSection'
import PopularCategory from './components/PopularCategory'
import earbud from './assets/images/category/earbud.png'
import speaker from './assets/images/category/speaker.png'
import ac from './assets/images/category/ac.png'
import ev from './assets/images/category/ev.png'
import dvd from './assets/images/category/dvd.png'
import OurServices from './components/OurServices'
import TrendingProducts from './components/TrendingProducts'
import DealOfTheDay from './components/DealOfTheDay'
import WeeklyProducts from './components/WeeklyProducts'
import TestimonialSection from './components/TestimonialSection'
import InstagramSection from './components/InstagramSection'
import BrandStrip from './components/BrandStrip'
import Footer from './components/Footer'

const categoryData = [
  {
    name: 'Wireless earbuds',
    count: 10,
    image: `${earbud}`
  },
  {
    name: 'Portable speaker',
    count: 18,
    image: `${speaker}`
  },
  {
    name: 'Air conditioner',
    count: 25,
    image: `${ac}`
  },
  {
    name: 'Ev charging plug',
    count: 25,
    image: `${ev}`
  },
  {
    name: 'DVD player slot',
    count: 5,
    image: `${dvd}`
  }
]

function App () {
  return (
    <>
      <Header />
      <HeroSection />
      <PopularCategory
        title='Popular category'
        subtitle='Favorites item'
        items={categoryData}
        onViewAll={() => console.log('View all clicked')}
      />
      <OurServices />
      <TrendingProducts />
      <DealOfTheDay endDate='2025-12-11T23:59:59' />
      <TestimonialSection />
      <WeeklyProducts />
      <InstagramSection />
      <BrandStrip />
      <Footer />
    </>
  )
}

export default App
