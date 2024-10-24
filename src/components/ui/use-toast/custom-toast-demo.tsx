"use client"
import React, { useState, useEffect } from 'react'

interface ToastProps {
  message: string
  type: 'success' | 'error' | 'info'
  duration?: number
  onClose: () => void
}

const Toast: React.FC<ToastProps> = ({ message, type, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500'
      case 'error':
        return 'bg-red-500'
      case 'info':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-md text-white ${getBackgroundColor()} shadow-lg`}>
      {message}
    </div>
  )
}

const ToastDemo: React.FC = () => {
  const [toast, setToast] = useState<ToastProps | null>(null)
  const [name, setName] = useState('')

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type, onClose: () => setToast(null) })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name) {
      showToast(`Hello, ${name}!`, 'success')
    } else {
      showToast('Please enter your name', 'error')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Custom Toast Demo</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter your name"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Show Success Toast
            </button>
            <button
              type="button"
              onClick={() => showToast('This is an error message', 'error')}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Show Error Toast
            </button>
            <button
              type="button"
              onClick={() => showToast('This is an info message', 'info')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Show Info Toast
            </button>
          </div>
        </form>
        {toast && <Toast {...toast} />}
      </div>
    </div>
  )
}

export default ToastDemo