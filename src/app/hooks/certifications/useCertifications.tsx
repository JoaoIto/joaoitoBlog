"use client"

import { useEffect, useState } from "react"
import { ICertification } from "@/components/ui/organisms/CertificationsSection"

export const useCertifications = () => {
  const [certifications, setCertifications] = useState<ICertification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCerts = async () => {
      setLoading(true)
      try {
        const response = await fetch("/api/certifications")
        const data = await response.json()
        setCertifications(data)
      } catch (error) {
        console.error("Failed to fetch certifications:", error)
        setCertifications([])
      } finally {
        setLoading(false)
      }
    }

    fetchCerts()
  }, [])

  return { certifications, loading }
}
