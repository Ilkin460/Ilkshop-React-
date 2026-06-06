import React from 'react'

import { Routes } from 'react-router'
import { Route } from 'react-router'
import Layout from '../../layout/Layout'
import Home from '../pages/Home'




function Router() {
  return (
      <>
          <Routes>
              <Route path='/' element={<Layout/>}>
                  <Route index element={<Home />} />
              </Route>
          </Routes>
      
      </>
  )
}

export default Router