'use server'

import { revalidatePath } from 'next/cache'
import { createItem } from './models/item'

export const addItemAction = async (name: string): Promise<void> => {
  await createItem(name)
  revalidatePath('/')
}
