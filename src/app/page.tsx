import { AddItemButton } from '@/components/AddItemButton'
import { listItems } from '@/lib/models/item'
import { pluralize } from '@/lib/utils'
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'

export default async function Home() {
  const items = await listItems()

  return (
    <Stack spacing={2}>
      <Typography variant="body1">
        You have {items.length.toLocaleString()} {pluralize(items.length, 'item', 'items')} in your
        list
      </Typography>
      <Box>
        <AddItemButton />
      </Box>
      {items.length > 0 && (
        <Box
          sx={{
            maxWidth: 400,
            border: 1,
            borderColor: 'grey.200',
            borderRadius: 1,
          }}
        >
          <List disablePadding>
            {items.map((item, index) => (
              <>
                <ListItem key={item.id} disableGutters disablePadding>
                  <ListItemButton href={`/item/${item.id}`}>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
                {/* Render a divider if and only if it is not the last item in the array */}
                {index < items.length - 1 && <Divider />}
              </>
            ))}
          </List>
        </Box>
      )}
    </Stack>
  )
}
