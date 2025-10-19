import { createContext, useContext, useEffect, useState } from 'react'

// User type definition
interface User {
  id: string
  email: string
  name: string
  phone?: string
  // Add more fields as needed
}

interface AuthContextType {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string, phone: string) => Promise<void>
  signOut: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Mock implementation for now - will connect to PHP API later
  const signIn = async (email: string, password: string) => {
    // TODO: Implement actual login logic with PHP API
    console.log('Sign in:', email, password)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock success - later replace with real API call
    if (email && password) {
      setUser({
        id: '1',
        email: email,
        name: 'John Doe', // Will come from API
        phone: '08123456789'
      })
    } else {
      throw new Error('Email dan password wajib diisi')
    }
  }

  const signUp = async (name: string, email: string, password: string, phone: string) => {
    // TODO: Implement actual registration logic with PHP API
    console.log('Sign up:', name, email, password, phone)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock success - later replace with real API call
    if (name && email && password && phone) {
      setUser({
        id: '1',
        email: email,
        name: name,
        phone: phone
      })
    } else {
      throw new Error('Semua field wajib diisi')
    }
  }

  const signOut = () => {
    setUser(null)
    // TODO: Clear localStorage/sessionStorage
    localStorage.removeItem('kelana_user')
  }

  useEffect(() => {
    // TODO: Check if user is already logged in (from localStorage, etc.)
    const savedUser = localStorage.getItem('kelana_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('kelana_user')
      }
    }
    setLoading(false)
  }, [])

  // Save user to localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('kelana_user', JSON.stringify(user))
    }
  }, [user])

  const value = {
    user,
    signIn,
    signUp,
    signOut,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}