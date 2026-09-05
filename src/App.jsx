import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Footer from './components/Footer'
import CvModal from './components/CvModal'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-light-bg dark:bg-background text-light-text-primary dark:text-text-primary transition-colors duration-200">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
      </main>
      <Footer />
      <CvModal />
    </div>
  )
}
