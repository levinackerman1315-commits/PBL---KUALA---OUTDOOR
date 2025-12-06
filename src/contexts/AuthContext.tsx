// import { createContext, useContext, useEffect, useState } from 'react'

// // User type definition
// interface User {
//   id: string
//   email: string
//   name: string
//   phone?: string
//   // Add more fields as needed
// }

// interface AuthContextType {
//   user: User | null
//   signIn: (email: string, password: string) => Promise<void>
//   signUp: (name: string, email: string, password: string, phone: string) => Promise<void>
//   signOut: () => void
//   loading: boolean
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [loading, setLoading] = useState(true)

//   // Mock implementation for now - will connect to PHP API later
//   const signIn = async (email: string, password: string) => {
//     // TODO: Implement actual login logic with PHP API
//     console.log('Sign in:', email, password)
    
//     // Simulate API call delay
//     await new Promise(resolve => setTimeout(resolve, 1000))
    
//     // Mock success - later replace with real API call
//     if (email && password) {
//       setUser({
//         id: '1',
//         email: email,
//         name: 'John Doe', // Will come from API
//         phone: '08123456789'
//       })
//     } else {
//       throw new Error('Email dan password wajib diisi')
//     }
//   }

//   const signUp = async (name: string, email: string, password: string, phone: string) => {
//     // TODO: Implement actual registration logic with PHP API
//     console.log('Sign up:', name, email, password, phone)
    
//     // Simulate API call delay
//     await new Promise(resolve => setTimeout(resolve, 1000))
    
//     // Mock success - later replace with real API call
//     if (name && email && password && phone) {
//       setUser({
//         id: '1',
//         email: email,
//         name: name,
//         phone: phone
//       })
//     } else {
//       throw new Error('Semua field wajib diisi')
//     }
//   }

//   const signOut = () => {
//     setUser(null)
//     // TODO: Clear localStorage/sessionStorage
//     localStorage.removeItem('kelana_user')
//   }

//   useEffect(() => {
//     // TODO: Check if user is already logged in (from localStorage, etc.)
//     const savedUser = localStorage.getItem('kelana_user')
//     if (savedUser) {
//       try {
//         setUser(JSON.parse(savedUser))
//       } catch (error) {
//         console.error('Error parsing saved user:', error)
//         localStorage.removeItem('kelana_user')
//       }
//     }
//     setLoading(false)
//   }, [])

//   // Save user to localStorage when user changes
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem('kelana_user', JSON.stringify(user))
//     }
//   }, [user])

//   const value = {
//     user,
//     signIn,
//     signUp,
//     signOut,
//     loading
//   }

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider')
//   }
//   return context
// }

// import { createContext, useContext, useEffect, useState } from 'react'

// // User type definition
// interface User {
//   id: string
//   email: string
//   name: string
//   phone?: string
//   google_id?: string
// }

// interface AuthContextType {
//   user: User | null
//   signIn: (email: string, password: string) => Promise<void>
//   signUp: (name: string, email: string, password: string, phone: string) => Promise<void>
//   signInWithGoogle: (credential: string) => Promise<void>
//   signOut: () => void
//   loading: boolean
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost/PBL-KELANA-OUTDOOR/api/public'

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [loading, setLoading] = useState(true)

//   // Login biasa (email/password)
//   const signIn = async (email: string, password: string) => {
//     try {
//       const res = await fetch(`${API_BASE}/login.php`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//       })
      
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`)
//       }
      
//       const data = await res.json()
      
//       if (data.success) {
//         const userData = {
//           id: String(data.customer_id),
//           email: data.email,
//           name: data.name,
//           phone: data.phone
//         }
//         setUser(userData)
//         localStorage.setItem('kelana_user', JSON.stringify(userData))
//       } else {
//         throw new Error(data.message || 'Email atau password salah')
//       }
//     } catch (error: any) {
//       if (error.message.includes('Failed to fetch')) {
//         throw new Error('Tidak dapat terhubung ke server. Pastikan PHP server berjalan di http://localhost')
//       }
//       throw error
//     }
//   }

//   // Register biasa
//   const signUp = async (name: string, email: string, password: string, phone: string) => {
//     try {
//       const res = await fetch(`${API_BASE}/register.php`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password, phone })
//       })
      
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`)
//       }
      
//       const data = await res.json()
      
//       if (!data.success) {
//         throw new Error(data.message || 'Registrasi gagal')
//       }
//     } catch (error: any) {
//       if (error.message.includes('Failed to fetch')) {
//         throw new Error('Tidak dapat terhubung ke server. Pastikan PHP server berjalan di http://localhost')
//       }
//       throw error
//     }
//   }

//   // Login Google
//   const signInWithGoogle = async (credential: string) => {
//     try {
//       const res = await fetch(`${API_BASE}/google-login.php`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ credential })
//       })
      
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`)
//       }
      
//       const data = await res.json()
      
//       if (data.success) {
//         const userData = {
//           id: String(data.customer_id),
//           email: data.email,
//           name: data.name,
//           google_id: data.google_id
//         }
//         setUser(userData)
//         localStorage.setItem('kelana_user', JSON.stringify(userData))
//       } else {
//         throw new Error(data.message || 'Login Google gagal')
//       }
//     } catch (error: any) {
//       if (error.message.includes('Failed to fetch')) {
//         throw new Error('Tidak dapat terhubung ke server. Pastikan PHP server berjalan')
//       }
//       throw error
//     }
//   }

//   const signOut = () => {
//     setUser(null)
//     localStorage.removeItem('kelana_user')
//   }

//   useEffect(() => {
//     // Cek user di localStorage
//     const savedUser = localStorage.getItem('kelana_user')
//     if (savedUser) {
//       try {
//         setUser(JSON.parse(savedUser))
//       } catch (error) {
//         localStorage.removeItem('kelana_user')
//       }
//     }
//     setLoading(false)
//   }, [])

//   const value = {
//     user,
//     signIn,
//     signUp,
//     signInWithGoogle,
//     signOut,
//     loading
//   }

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider')
//   }
//   return context
// }


import { createContext, useContext, useEffect, useState } from 'react'

// User type definition
interface User {
  id: string
  email: string
  name: string
  phone?: string
  google_id?: string
}

interface AuthContextType {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string, phone: string) => Promise<void>
  signInWithGoogle: (credential: string) => Promise<void>
  signOut: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// VITE_API_URL should be: https://kualaoutdoor.free.nf/api (without /public)
const API_BASE = import.meta.env.VITE_API_URL || 'https://kualaoutdoor.free.nf/api'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Debug: Log API URL saat pertama kali load
  useEffect(() => {
    console.log('🔗 API Base URL:', API_BASE)
  }, [])

  // Login biasa (email/password)
  const signIn = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE}/login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      
      const data = await res.json()
      
      if (data.success) {
        const userData = {
          id: String(data.customer_id),
          email: data.email,
          name: data.name,
          phone: data.phone
        }
        setUser(userData)
        localStorage.setItem('kelana_user', JSON.stringify(userData))
      } else {
        throw new Error(data.message || 'Email atau password salah')
      }
    } catch (error: any) {
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Tidak dapat terhubung ke server. Pastikan PHP server berjalan di http://localhost')
      }
      throw error
    }
  }

  // Register biasa
  const signUp = async (name: string, email: string, password: string, phone: string) => {
    try {
      const res = await fetch(`${API_BASE}/register.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone })
      })
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      
      const data = await res.json()
      
      if (!data.success) {
        throw new Error(data.message || 'Registrasi gagal')
      }
    } catch (error: any) {
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Tidak dapat terhubung ke server. Pastikan PHP server berjalan di http://localhost')
      }
      throw error
    }
  }

  // Login Google
  const signInWithGoogle = async (credential: string) => {
    try {
      const res = await fetch(`${API_BASE}/google-login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential })
      })
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      
      const data = await res.json()
      
      if (data.success) {
        const userData = {
          id: String(data.customer_id),
          email: data.email,
          name: data.name,
          google_id: data.google_id
        }
        setUser(userData)
        localStorage.setItem('kelana_user', JSON.stringify(userData))
      } else {
        throw new Error(data.message || 'Login Google gagal')
      }
    } catch (error: any) {
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Tidak dapat terhubung ke server. Pastikan PHP server berjalan')
      }
      throw error
    }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('kelana_user')
  }

  useEffect(() => {
    // Cek user di localStorage
    const savedUser = localStorage.getItem('kelana_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem('kelana_user')
      }
    }
    setLoading(false)
  }, [])

  const value = {
    user,
    signIn,
    signUp,
    signInWithGoogle,
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