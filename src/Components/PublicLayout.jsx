import React from 'react'
import Navbar from '../Composants/Navbar/Navbar'

const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default PublicLayout
