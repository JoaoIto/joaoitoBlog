"use client"
import { createContext, useContext, useState, ReactNode } from 'react'

// Definindo a interface para o Toast
interface ToastOptions {
  title: string
  description: string
  variant?: 'default' | 'destructive'
  action?: ReactNode
}

// Definindo o contexto
interface ToastContextType {
  toast: (options: ToastOptions) => void
}

// Criando o contexto
const ToastContext = createContext<ToastContextType | undefined>(undefined)

// Provider do contexto
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastOptions[]>([])

  // Função para disparar os toasts
  const toast = ({ title, description, variant = 'default', action }: ToastOptions) => {
    setToasts((prevToasts) => [...prevToasts, { title, description, variant, action }])
    // Aqui você pode definir um tempo para remover o toast automaticamente, por exemplo.
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Renderize os toasts aqui */}
      <div className="fixed bottom-4 right-4 space-y-2">
        {toasts.map((toast, index) => (
          <div key={index} className={`toast ${toast.variant}`}>
            <div className="font-bold">{toast.title}</div>
            <div>{toast.description}</div>
            {toast.action && <div>{toast.action}</div>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// Hook para usar o contexto do Toast
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext)
  if (!context) {
    console.log(new Error('useToast must be used within a ToastProvider'))
  }
  return context as ToastContextType
}

