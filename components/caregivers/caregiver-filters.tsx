'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

export function CaregiverFilters() {
  const [filters, setFilters] = useState({
    minRate: '',
    maxRate: '',
    languages: [] as string[],
    experience: [] as string[],
    availability: [] as string[]
  })

  const languages = ['English', 'Spanish', 'French', 'Mandarin', 'Portuguese']
  const experienceRanges = ['0-5 years', '5-10 years', '10-20 years', '20+ years']
  const availabilityOptions = ['Weekdays', 'Weekends', 'Evenings', 'Overnight']

  const handleLanguageChange = (language: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      languages: checked 
        ? [...prev.languages, language]
        : prev.languages.filter(l => l !== language)
    }))
  }

  const handleExperienceChange = (exp: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      experience: checked 
        ? [...prev.experience, exp]
        : prev.experience.filter(e => e !== exp)
    }))
  }

  const handleAvailabilityChange = (avail: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      availability: checked 
        ? [...prev.availability, avail]
        : prev.availability.filter(a => a !== avail)
    }))
  }

  const clearFilters = () => {
    setFilters({
      minRate: '',
      maxRate: '',
      languages: [],
      experience: [],
      availability: []
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
        <CardDescription>Refine your search</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-sm font-medium">Hourly Rate</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div>
              <Label htmlFor="minRate" className="text-xs text-gray-500">Min ($)</Label>
              <Input
                id="minRate"
                type="number"
                placeholder="0"
                value={filters.minRate}
                onChange={(e) => setFilters(prev => ({ ...prev, minRate: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="maxRate" className="text-xs text-gray-500">Max ($)</Label>
              <Input
                id="maxRate"
                type="number"
                placeholder="100"
                value={filters.maxRate}
                onChange={(e) => setFilters(prev => ({ ...prev, maxRate: e.target.value }))}
              />
            </div>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Languages</Label>
          <div className="space-y-2 mt-2">
            {languages.map((language) => (
              <div key={language} className="flex items-center space-x-2">
                <Checkbox
                  id={language}
                  checked={filters.languages.includes(language)}
                  onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
                />
                <Label htmlFor={language} className="text-sm">{language}</Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Experience</Label>
          <div className="space-y-2 mt-2">
            {experienceRanges.map((exp) => (
              <div key={exp} className="flex items-center space-x-2">
                <Checkbox
                  id={exp}
                  checked={filters.experience.includes(exp)}
                  onCheckedChange={(checked) => handleExperienceChange(exp, checked as boolean)}
                />
                <Label htmlFor={exp} className="text-sm">{exp}</Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Availability</Label>
          <div className="space-y-2 mt-2">
            {availabilityOptions.map((avail) => (
              <div key={avail} className="flex items-center space-x-2">
                <Checkbox
                  id={avail}
                  checked={filters.availability.includes(avail)}
                  onCheckedChange={(checked) => handleAvailabilityChange(avail, checked as boolean)}
                />
                <Label htmlFor={avail} className="text-sm">{avail}</Label>
              </div>
            ))}
          </div>
        </div>

        <Button onClick={clearFilters} variant="outline" className="w-full">
          Clear All Filters
        </Button>
      </CardContent>
    </Card>
  )
}
