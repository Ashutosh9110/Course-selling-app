
import './App.css'
import Banner2 from './components/Banner2';
import Banner from './components/Banner';
import Header from './components/Header'
import Hero from './components/Hero';
// import About from './components/about/About'

import Navbar from './components/Navbar'
import Services from './components/Services';
import StaggeredDropDown from './components/StaggeredDropdown';
import Subscribe from './components/Subscribe';



function App() {

  return (
    <main className="overflow-x-hidden text-white bg-[#242424]">
      <Hero />
      {/* <Navbar /> */}
      <StaggeredDropDown />
      <Services />
      <Banner />
      <Subscribe />
      <Banner2 />
      {/* <About /> */}
    </main>
  )
}

export default App
