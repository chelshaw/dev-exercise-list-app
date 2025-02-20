import { getItemDetails } from '@/lib/models/item'
import { getCurrentAuthUser } from '@/lib/models/user'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Button, Chip, Stack, Tooltip, Typography } from '@mui/material'
import Link from 'next/link'

export default async function Page({ params }: { params: { id: string } }) {
  const authUser = getCurrentAuthUser()
  const itemDetails = await getItemDetails(authUser, params.id)

  return (
    <Box>
      <Button href={'/dashboard'} startIcon={<ArrowBackIcon />}>
        Back to all items
      </Button>
      {itemDetails ? (
        <>
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Typography variant="h4">{itemDetails.name}</Typography>
            {itemDetails.category?.description ? (
              <Tooltip title={itemDetails.category.description}>
                <Link href={`/dashboard/category/${itemDetails.category.name}`} passHref>
                  <Chip label={itemDetails.category.name} />
                </Link>
              </Tooltip>
            ) : (
              <Link href={`/dashboard/category/${itemDetails.category?.name || 'uncategorized'}`} passHref>
                <Chip label={itemDetails.category?.name || 'uncategorized'} />
              </Link>
            )}
          </Stack>
          <Typography color={itemDetails.description ? 'text.primary' : 'text.secondary'}>
            {itemDetails.description || 'No description'}
          </Typography>
          {itemDetails.image && (
            // Next Image doesn't allow arbitrary sources -- swap when we allow uploads & serve from vercel
            // eslint-disable-next-line @next/next/no-img-element
            <img src={itemDetails.image} alt={itemDetails.name} width="300" />
          )}
        </>
      ) : (
        <Typography color="text.secondary">Item not found</Typography>
      )}
    </Box>
  )
}
