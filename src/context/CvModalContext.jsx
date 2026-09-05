import React, { createContext, useContext, useState } from 'react'

const CvModalContext = createContext()

export function CvModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  const openCv = () => setIsOpen(true)
  const closeCv = () => setIsOpen(false)

  return (
    <CvModalContext.Provider value={{ isOpen, openCv, closeCv }}>
      {children}
    </CvModalContext.Provider>
  )
}

export function useCvModal() {
  const context = useContext(CvModalContext)
  if (!context) {
    throw new Error('useCvModal must be used within a CvModalProvider')
  }
  return context
}
