"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"

interface SearchBarProps {
  onSearch: (filters: any) => void
  initialFilters?: any
}

export function SearchBar({ onSearch, initialFilters = {} }: SearchBarProps) {
  const [query, setQuery] = useState(initialFilters.q || "")
  const [filters, setFilters] = useState(initialFilters)
  const [availableFilters, setAvailableFilters] = useState<any>({})
  const [showAdvanced, setShowAdvanced] = useState(false)

  useEffect(() => {
    fetchAvailableFilters()
  }, [])

  const fetchAvailableFilters = async () => {
    try {
      const response = await fetch("/api/competitions/filters")
      const data = await response.json()
      setAvailableFilters(data.filters)
    } catch (error) {
      console.error("Failed to fetch filters:", error)
    }
  }

  const handleSearch = () => {
    onSearch({ ...filters, q: query })
  }

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters }
    if (value === "all" || !value) {
      delete newFilters[key]
    } else {
      newFilters[key] = value
    }
    setFilters(newFilters)
  }

  const clearFilter = (key: string) => {
    const newFilters = { ...filters }
    delete newFilters[key]
    setFilters(newFilters)
    onSearch({ ...newFilters, q: query })
  }

  const clearAllFilters = () => {
    setFilters({})
    setQuery("")
    onSearch({ q: "" })
  }

  const activeFiltersCount = Object.keys(filters).length + (query ? 1 : 0)

  return (
    <div className="space-y-4">
      {/* Main search bar */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Поиск программ, университетов, направлений..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch} className="bg-gradient-to-r from-pink-500 to-orange-500">
          Найти
        </Button>
        <Button variant="outline" onClick={() => setShowAdvanced(!showAdvanced)} className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Фильтры
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Active filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-600">Активные фильтры:</span>
          {query && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Поиск: "{query}"
              <X className="h-3 w-3 cursor-pointer" onClick={() => setQuery("")} />
            </Badge>
          )}
          {Object.entries(filters).map(([key, value]) => (
            <Badge key={key} variant="secondary" className="flex items-center gap-1">
              {key}: {value as string}
              <X className="h-3 w-3 cursor-pointer" onClick={() => clearFilter(key)} />
            </Badge>
          ))}
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-red-500">
            Очистить все
          </Button>
        </div>
      )}

      {/* Advanced filters */}
      {showAdvanced && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
          <Select value={filters.category || ""} onValueChange={(value) => handleFilterChange("category", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все категории</SelectItem>
              {availableFilters.categories?.map((cat: any) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label} ({cat.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.subject || ""} onValueChange={(value) => handleFilterChange("subject", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Предмет" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все предметы</SelectItem>
              {availableFilters.subjects?.map((subj: any) => (
                <SelectItem key={subj.value} value={subj.value}>
                  {subj.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.level || ""} onValueChange={(value) => handleFilterChange("level", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Уровень" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все уровни</SelectItem>
              {availableFilters.levels?.map((level: any) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.format || ""} onValueChange={(value) => handleFilterChange("format", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Формат" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все форматы</SelectItem>
              {availableFilters.formats?.map((format: any) => (
                <SelectItem key={format.value} value={format.value}>
                  {format.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.is_free || ""} onValueChange={(value) => handleFilterChange("is_free", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Стоимость" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Любая</SelectItem>
              <SelectItem value="true">Бесплатно</SelectItem>
              <SelectItem value="false">Платно</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button onClick={handleSearch} size="sm" className="flex-1">
              Применить
            </Button>
            <Button variant="outline" onClick={clearAllFilters} size="sm">
              Сбросить
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
