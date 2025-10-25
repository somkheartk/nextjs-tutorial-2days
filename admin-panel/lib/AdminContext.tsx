'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface User {
  name: string
  email: string
  role: string
}

interface AdminContextType {
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
  switchRole: (newRole: string) => void
  currentLocale: string
  switchLocale: (locale: string) => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children, locale }: { children: ReactNode, locale: string }) {
  const router = useRouter()
  const pathname = usePathname()
  
  // Initialize user from localStorage or default
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('currentUser')
      if (storedUser) {
        return JSON.parse(storedUser)
      }
      // Set default user if not exists
      const defaultUser = {
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin'
      }
      localStorage.setItem('currentUser', JSON.stringify(defaultUser))
      return defaultUser
    }
    return null
  })
  
  const [currentLocale, setCurrentLocale] = useState(locale)


  const switchRole = (newRole: string) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, role: newRole }
      setCurrentUser(updatedUser)
      localStorage.setItem('currentUser', JSON.stringify(updatedUser))
    }
  }

  const switchLocale = (newLocale: string) => {
    setCurrentLocale(newLocale)
    // Replace locale in the current path
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
  }

  return (
    <AdminContext.Provider value={{ 
      currentUser, 
      setCurrentUser, 
      switchRole,
      currentLocale,
      switchLocale 
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}
