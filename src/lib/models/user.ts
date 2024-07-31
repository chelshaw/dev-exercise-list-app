import { auth } from '@clerk/nextjs/server'

export type AuthUser = {
  id: string
}

export const getCurrentAuthUser = (): AuthUser => {
  const { userId } = auth()
  if (!userId) throw new Error('User not found')
  return { id: userId }
}
