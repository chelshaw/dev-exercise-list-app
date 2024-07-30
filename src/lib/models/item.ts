'use server'

import prisma from '../prisma'

type ListItem = {
  id: string
  name: string
}

type ListItemDetails = {
  id: string
  name: string
  description: string | null
}

export const listItems = async (): Promise<ListItem[]> => {
  const listItems = await prisma.listItem.findMany()
  return listItems.map((item) => ({ id: item.id, name: item.name }))
}

export const getItemDetails = async (id: string): Promise<ListItemDetails | null> => {
  const listItem = await prisma.listItem.findUnique({ where: { id } })
  if (!listItem) return null
  return { id: listItem.id, name: listItem.name, description: listItem.description }
}

export const createItem = async (name: string): Promise<ListItem> => {
  if (!name) throw new Error('Name is required')
  const listItem = await prisma.listItem.create({ data: { name } })
  return { id: listItem.id, name: listItem.name }
}
