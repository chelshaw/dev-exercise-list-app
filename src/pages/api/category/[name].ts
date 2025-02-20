import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' })
  }
  const { name } = req.query
  const { description } = req.body
  if (typeof name !== 'string') {
    res.status(400).json({ error: 'category name must be a string' })
  }
  try {
    await prisma.category.create({
      data: {
        name: name as string,
        description: description as string,
      },
    })
    res.status(200).json({ message: `successfully created category ${name}` })
  } catch (err) {
    res.status(500).json({ error: `failed to save category ${name}` })
  }
}
