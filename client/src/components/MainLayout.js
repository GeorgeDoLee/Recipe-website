import React from 'react'
import Header from './Header'
import Footer from './Footer'

const MainLayout = ({children}) => {
  return (
    <div className='flex flex-col min-h-screen bg-cornstick'>
      <Header />
      <div className='flex-grow '>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
