"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ModeToggle } from "./theme-toggle" // Assuming this handles light/dark mode
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Effect to handle scroll for background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50) // Adjust scroll threshold for background change
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when clicking outside (optional, but good UX)
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isMenuOpen && !event.target) { // Add a ref to the nav to check if click is outside
        // For simplicity, we'll just close it on any click outside the button
        // A more robust solution would involve checking if the click is within the nav ref
        // For this example, we'll rely on link clicks closing the menu.
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuOpen]);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-black/90 backdrop-blur-lg shadow-xl border-b border-red-600" // Darker, blurrier, stronger shadow, red border
          : "bg-black" // Solid black when at top
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <img src="logoGarete.png" alt="Logo Gare7e" className="h-10 w-auto rounded-md shadow-lg transition-transform duration-300 group-hover:scale-105" />
          {/* Optional: Add text logo with your theme font if 'font-graffiti' is available */}
          {/* <span className="text-white text-2xl font-graffiti ml-2 tracking-wide">GARE7E</span> */}
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-white font-semibold"> {/* Increased spacing */}
          <Link href="/quienes-somos" className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full hover:text-red-600 py-1">
            Quiénes somos
          </Link>
          <Link href="/eventos" className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full hover:text-red-600 py-1">
            Próximos eventos
          </Link>
          <Link href="/contacto" className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full hover:text-red-600 py-1">
            Contacto
          </Link>
          <Link href="/galeria" className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full hover:text-red-600 py-1">
            Galería
          </Link>
          <ModeToggle />
        </div>

        {/* Mobile Menu Button & ModeToggle */}
        <div className="flex items-center gap-4 md:hidden">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-red-600 transition-colors duration-200"
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />} {/* Larger icons */}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-md z-40 flex flex-col items-center justify-center space-y-8 text-white text-2xl font-semibold animate-fade-in"
          style={{ animationDuration: '0.3s' }} // Custom animation duration
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:text-red-600 transition-colors duration-200"
            onClick={toggleMenu}
            aria-label="Close mobile menu"
          >
            <X className="h-8 w-8" /> {/* Even larger close icon */}
          </Button>

          <Link href="/quienes-somos" className="hover:text-red-600 transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
            Quiénes somos
          </Link>
          <Link href="/eventos" className="hover:text-red-600 transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
            Próximos eventos
          </Link>
          <Link href="/contacto" className="hover:text-red-600 transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
            Contacto
          </Link>
          <Link href="/galeria" className="hover:text-red-600 transition-colors duration-200" onClick={() => setIsMenuOpen(false)}>
            Galería
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar