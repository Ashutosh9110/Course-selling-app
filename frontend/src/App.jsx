
import './App.css'
import Banner2 from './components/Banner2';
import Banner from './components/Banner';
// import Header from './components/Header'
import Hero from './components/Hero';
// import About from './components/about/About'

import Navbar from './components/Navbar'
import Services from './components/Services';
import StaggeredDropDown from './components/StaggeredDropdown';
import Subscribe from './components/Subscribe';
import Footer from './components/Footer';



function App() {

  return (
    <main className="overflow-x-hidden bg-white text-dark">
      <Hero />
      {/* <Navbar /> */}
      {/* <StaggeredDropDown /> */}
      <Services />
      <Banner />
      <Subscribe />
      <Banner2 />
      <Footer />
      {/* <About /> */}
    </main>
  )
}

export default App
