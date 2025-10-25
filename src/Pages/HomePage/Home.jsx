import React from 'react'
import Navbar from '../../Composants/Navbar/Navbar'
import Hero from '../../Composants/Hero/Hero'
import HowItWorks from '../../Composants/HowItWorks/HowItWorks'
import GamesSection from '../../Composants/GamesSection/GamesSection'
import SecuritySection from '../../Composants/SecuritySection/SecuritySection'
function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero/>
      <HowItWorks/>
      <GamesSection/>
      <SecuritySection/>
    </div>
  )
}

export default Home
