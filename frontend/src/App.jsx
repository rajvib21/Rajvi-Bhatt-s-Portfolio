import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import SocialLinks from './components/SocialLinks'
import Footer from './components/Footer'
import BeyondTech from './components/beyondTech'
import { useState } from 'react'

export default function App() {
  const [showBeyondTech, setShowBeyondTech] = useState(false)
  return (
    <>
      <Navbar />
      {showBeyondTech ? (
        <main>
          <BeyondTech onClose={() => setShowBeyondTech(false)} />
        </main>
      ) : (
        <main>
          <Home />
          <About onOpenBeyondTech={() => setShowBeyondTech(true)} />
          <Skills />
          <Experience />
          <Portfolio />
          <Contact />
        </main>
      )}
      <Footer />
      <SocialLinks />
    </>
  )
}
