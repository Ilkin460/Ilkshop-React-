import React from 'react'
import { Outlet } from 'react-router'
import Header from '../components/inc/Header'
import Footer from '../components/inc/Footer'

function Layout() {
  return (
      <>
          <Header />
          <Outlet/>
          <Footer/>
      
      </>
  )
}

export default Layout