import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CvModal from './components/CvModal'
import Home from './pages/Home'

const BlogList = lazy(() => import('./pages/BlogList'))
const BlogPost = lazy(() => import('./pages/BlogPost'))

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-light-bg dark:bg-background text-light-text-primary dark:text-text-primary transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="py-32 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <CvModal />
    </div>
  )
}
