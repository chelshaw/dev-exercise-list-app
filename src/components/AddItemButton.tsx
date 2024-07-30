'use client'

import { addItemAction } from '@/app/_actions'
import { Add } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material'
import { useState } from 'react'

export const AddItemButton = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async (data: FormData) => {
    const name = data.get('name')
    if (!name || typeof name !== 'string') return
    await addItemAction(name)
    handleClose()
  }

  return (
    <>
      <Button onClick={handleOpen} variant="outlined" startIcon={<Add />}>
        Add item
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth={'sm'} fullWidth>
        <form action={handleSubmit}>
          <DialogTitle>Add an item to the list</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ my: 2 }}>
              <TextField name="name" label="Name" fullWidth />
              <TextField
                name="description"
                label="Description"
                fullWidth
                multiline={true}
                rows={4}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
