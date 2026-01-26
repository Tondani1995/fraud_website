import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

interface Props {
  children: React.ReactNode
}

export default function Wrapper({ children }: Props) {
  return (
    <div className="">
      <Navbar />
      <div className="md:h-16 h-10"></div>
      {children}
      <Footer />
    </div>
  )
}
