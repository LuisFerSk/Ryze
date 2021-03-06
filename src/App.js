import React from 'react'
import Router from './Router'
import ThemeConfig from './theme'
import Providers from './Providers'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <Providers>
      <ThemeConfig>
        <ScrollToTop />
        <Router />
      </ThemeConfig>
    </Providers>
  )
}
