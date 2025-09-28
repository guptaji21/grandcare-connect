'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { registerSchema } from '@/lib/validations/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const role = searchParams.get('role') || 'PARENT'

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: role as 'PARENT' | 'CAREGIVER'
    }
  })

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed')
      }

      toast({
        title: 'Success',
        description: 'Account created successfully. Please sign in.'
      })
      
      router.push('/auth/signin')
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            {...register('firstName')}
            className={errors.firstName ? 'border-red-500' : ''}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            {...register('lastName')}
            className={errors.lastName ? 'border-red-500' : ''}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...register('password')}
          className={errors.password ? 'border-red-500' : ''}
        />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phone">Phone (Optional)</Label>
        <Input
          id="phone"
          type="tel"
          {...register('phone')}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            {...register('city')}
            className={errors.city ? 'border-red-500' : ''}
          />
          {errors.city && (
            <p className="text-sm text-red-500 mt-1">{errors.city.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            {...register('state')}
            className={errors.state ? 'border-red-500' : ''}
          />
          {errors.state && (
            <p className="text-sm text-red-500 mt-1">{errors.state.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            {...register('country')}
            className={errors.country ? 'border-red-500' : ''}
          />
          {errors.country && (
            <p className="text-sm text-red-500 mt-1">{errors.country.message}</p>
          )}
        </div>
      </div>

      <div className="p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Role:</strong> {role === 'PARENT' ? 'Parent' : 'Caregiver'}
        </p>
        <p className="text-xs text-blue-600 mt-1">
          {role === 'PARENT' 
            ? 'You will be able to search and book caregivers for your children.'
            : 'You will be able to create a profile and accept booking requests from parents.'
          }
        </p>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Creating account...' : 'Create Account'}
      </Button>
    </form>
  )
}
