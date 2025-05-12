"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { loginUser, registerUser, getUserProfile } from "../api"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      checkAuthStatus()
    } else {
      setLoading(false)
    }
  }, [])

  const checkAuthStatus = async () => {
    try {
      setLoading(true)
      const response = await getUserProfile()
      setUser(response.data)
      setError(null)
    } catch (err) {
      localStorage.removeItem("token")
      setUser(null)
      setError("Authentication failed")
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      setLoading(true)
      const response = await loginUser({ email, password })
      const { token, ...userData } = response.data
      localStorage.setItem("token", token)
      setUser(userData)
      setError(null)
      return true
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
      return false
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      setLoading(true)
      const response = await registerUser(userData)
      const { token, ...newUserData } = response.data
      localStorage.setItem("token", token)
      setUser(newUserData)
      setError(null)
      return true
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed")
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
