import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      role: 'PARENT' | 'CAREGIVER' | 'ADMIN'
    }
  }

  interface User {
    id: string
    email: string
    name?: string | null
    image?: string | null
    role: 'PARENT' | 'CAREGIVER' | 'ADMIN'
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: 'PARENT' | 'CAREGIVER' | 'ADMIN'
  }
}
