import { z } from 'zod'
import { fromError } from 'zod-validation-error'
import prisma from '../prisma'
import { AuthUser } from './user'

type ListItem = {
  id: string
  name: string
}

type ListItemDetails = {
  id: string
  name: string
  description: string | null
  image: string | null
  category: Category | null
}

type Category = {
  name: string
  description?: string | null
}

export const listMyItems = async (authUser: AuthUser): Promise<ListItem[]> => {
  const items = await prisma.listItem.findMany({ where: { authorId: authUser.id } })
  return items.map((item) => ({ id: item.id, name: item.name }))
}

export const listCategories = async (): Promise<Category[]> => {
  const cats = await prisma.category.findMany()
  return cats.map((cat) => ({ name: cat.name }))
}

export const getItemsByCategory = async (
  authUser: AuthUser,
  categoryName: string,
): Promise<ListItem[]> => {
  const items = await prisma.listItem.findMany({ where: { authorId: authUser.id, categoryName } })
  return items.map((item) => ({ id: item.id, name: item.name, image: item.image }))
}

export const getItemDetails = async (
  authUser: AuthUser,
  id: string,
): Promise<ListItemDetails | null> => {
  const listItem = await prisma.listItem.findFirst({
    where: { id, authorId: authUser.id },
    include: {
      category: true,
    },
  })
  if (!listItem) return null
  return {
    id: listItem.id,
    name: listItem.name,
    description: listItem.description,
    image: listItem.image,
    category: listItem.category,
  }
}

export const createItem = async (
  authUser: AuthUser,
  name: string,
  description: string,
  image: string,
  category: string,
): Promise<ListItem> => {
  const schema = z.object({
    name: z.string().trim().min(1),
    description: z.string().trim().optional(),
    image: z.string().trim().optional(),
    category: z.string().trim().optional(),
  })

  const parse = schema.safeParse({ name, description, image, category })

  if (!parse.success) {
    throw fromError(parse.error)
  }

  const data = parse.data
  const listItem = await prisma.listItem.create({
    data: {
      name: data.name,
      description: data.description,
      image: data.image,
      authorId: authUser.id,
      categoryName: data.category,
    },
  })
  return { id: listItem.id, name: listItem.name }
}
