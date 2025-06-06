'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/replicada.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.8
        }}
      />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="relative z-10"
      >
        <Image
          src="/logoGarete.png"
          alt="Garete Logo"
          width={300}
          height={300}
          className="object-contain"
        />
      </motion.div>
    </div>
  )
} 