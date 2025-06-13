'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createClientSupabaseClient } from '@/lib/supabase'
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Calendar, 
  LogOut,
  Menu,
  X,
  User
} from 'lucide-react'
import Link from 'next/link'

export function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClientSupabaseClient()

  // Detectar si estamos en móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const menuItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', href: '/admin' },
    { icon: <ImageIcon className="w-5 h-5" />, label: 'Galería', href: '/admin/gallery' },
    { icon: <Calendar className="w-5 h-5" />, label: 'Eventos', href: '/admin/events' },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar Toggle Button - Fixed */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md hover:bg-gray-50 lg:hidden"
      >
        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <div 
        className={`
          fixed inset-y-0 left-0 z-40 
          bg-white shadow-lg 
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isMobile ? 'w-64' : 'w-72'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <div className="flex items-center space-x-2">
              <User className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-800">Panel Admin</h1>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center px-4 py-3 text-gray-700 rounded-md
                      hover:bg-gray-100 transition-colors duration-200
                      ${pathname === item.href ? 'bg-blue-50 text-blue-600' : ''}
                    `}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t">
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-3">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div 
        className={`
          min-h-screen
          transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'lg:ml-72' : ''}
          ${isMobile ? 'pt-16' : 'pt-0'}
        `}
      >
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
} 