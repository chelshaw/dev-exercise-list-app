import { getItemDetails } from '@/lib/models/item'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Button, Typography } from '@mui/material'

export default async function Page({ params }: { params: { id: string } }) {
  const itemDetails = await getItemDetails(params.id)

  if (!itemDetails) return <Typography>Not found</Typography>

  return (
    <Box>
      <Button href={'/'} startIcon={<ArrowBackIcon />}>
        Back to all items
      </Button>
      <Typography variant="h4">{itemDetails.name}</Typography>
    </Box>
  )
}
