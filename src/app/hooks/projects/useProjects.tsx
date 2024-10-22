"use client"

import { IProjeto } from "@/app/interfaces/IProjeto"
import { useEffect, useState } from "react"

export const useProjects = () => {
    const [projects, setProjects] = useState<IProjeto[]>([]) 
    const [loading, setLoading] = useState(false)
  
    useEffect(() => {
      const fetchProjects = async () => {
        setLoading(true)
        try {
          const response = await fetch("/api/projects")
          const data = await response.json()
  
          // Verifique se o resultado é um array, caso contrário, defina como vazio
          if (data) {
            console.log("Projetos: " + JSON.stringify(data));
            setProjects(data)
          } else {
            setProjects([]) // Se não for um array, defina como um array vazio
          }
        } catch (error) {
          console.error("Failed to fetch projects:", error)
          setProjects([]) // Defina como vazio em caso de erro
        } finally {
          setLoading(false)
        }
      }
  
      fetchProjects()
    }, [])
  
    return { projects, loading }
  }