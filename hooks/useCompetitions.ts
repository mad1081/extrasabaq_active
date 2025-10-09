"use client"

import { useState, useEffect } from "react"

export function useCompetitions(filters: any = {}) {
  const [competitions, setCompetitions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCompetitions()
  }, [filters])

  const fetchCompetitions = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams(filters)
      const response = await fetch(`/api/competitions?${params}`)
      const data = await response.json()

      if (response.ok) {
        setCompetitions(data.competitions)
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError("Failed to fetch competitions")
    } finally {
      setLoading(false)
    }
  }

  const addToFavorites = async (userId: string, competitionId: string) => {
    try {
      const response = await fetch("/api/user/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, competitionId }),
      })
      return response.json()
    } catch (err) {
      throw new Error("Failed to add to favorites")
    }
  }

  const addToCalendar = async (userId: string, competitionId: string, reminderDate?: string, notes?: string) => {
    try {
      const response = await fetch("/api/user/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, competitionId, reminderDate, notes }),
      })
      return response.json()
    } catch (err) {
      throw new Error("Failed to add to calendar")
    }
  }

  return {
    competitions,
    loading,
    error,
    refetch: fetchCompetitions,
    addToFavorites,
    addToCalendar,
  }
}
