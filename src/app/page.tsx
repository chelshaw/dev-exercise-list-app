import { auth } from '@clerk/nextjs/server'
import { Link, Typography } from '@mui/material'
import NextLink from 'next/link'

export default async function Home() {
  const { userId } = auth()

  if (userId) {
    return (
      <Typography>
        Welcome to the List App! Get started by navigating to your{' '}
        <Link href="/dashboard" component={NextLink}>
          dashboard
        </Link>
        .
      </Typography>
    )
  }
  return <Typography>Welcome to the List App! Get started by signing in.</Typography>
}
