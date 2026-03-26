"use client"

import { IGithubRepo } from "@/app/api/github/route"
import { useEffect, useState } from "react"

export const useGithubRepos = () => {
  const [repos, setRepos] = useState<IGithubRepo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true)
      try {
        const response = await fetch("/api/github")
        if (!response.ok) throw new Error("Failed to fetch")
        const data: IGithubRepo[] = await response.json()
        setRepos(data)
      } catch (error) {
        console.error("GitHub fetch error:", error)
        setRepos([])
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  return { repos, loading }
}
