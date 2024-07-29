import prisma from '../prisma'

type List = {
  id: string
  name: string
}

export const getLists = async () => {
  const lists = await prisma.list.findMany()
  return lists.map((list) => ({ id: list.id, name: list.name }))
}
