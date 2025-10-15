import React from 'react'
import './Home.css'
import Navbar from '../../Composants/Navbar/Navbar'
import Hero from '../../Composants/Hero/Hero'
import HowItWorks from '../../Composants/HowItWorks/HowItWorks'
import GamesSection from '../../Composants/GamesSection/GamesSection'
function Home() {
  return (
    <div>
      <Navbar />
      <Hero/>
      <HowItWorks/>
      <GamesSection/>
    </div>
  )
}

export default Home
