"use client"

import { useEffect, useState } from "react"
import { Certification } from "@/components/ui/organisms/CertificationsSection"

export const useCertifications = () => {
  const [certifications, setCertifications] = useState<Certification[]>([])
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
