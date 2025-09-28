'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Search, MapPin, Filter } from 'lucide-react'

export function CaregiverSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [location, setLocation] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search logic
    console.log('Searching for:', { searchTerm, location })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="search">Search caregivers</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="search"
                placeholder="Search by name, experience, or special skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="location"
                placeholder="City, State or ZIP code"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Button type="submit" className="flex items-center">
            <Search className="mr-2 h-4 w-4" />
            Search Caregivers
          </Button>
          
          <Button type="button" variant="outline" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>
      </form>
    </div>
  )
}
