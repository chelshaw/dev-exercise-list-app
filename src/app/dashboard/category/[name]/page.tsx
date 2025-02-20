import { getItemsByCategory } from '@/lib/models/item'
import { getCurrentAuthUser } from '@/lib/models/user'
import { pluralize } from '@/lib/utils'
import {
    Avatar,
    Box,
    Button,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Stack,
    Typography,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default async function CategoryItems({ params }: { params: { name: string } }) {
    const authUser = getCurrentAuthUser()
    const items = await getItemsByCategory(authUser, params.name)

    return (
        <Box>
            <Button href={'/dashboard'} startIcon={<ArrowBackIcon />}>
                Back to all items
            </Button>
            <Stack spacing={2} sx={{ maxWidth: 400 }}>
                <Typography variant="h4">Category: {params.name}</Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant="body1">
                        You have{' '}
                        <Box component="span" sx={{ fontWeight: 700 }}>
                            {items.length.toLocaleString()} {pluralize(items.length, 'item', 'items')}
                        </Box>{' '}
                        matching the category "{params.name}"
                    </Typography>
                </Box>
                {items.length > 0 && (
                    <Box
                        sx={{
                            border: 1,
                            borderColor: 'grey.200',
                            borderRadius: 1,
                        }}
                    >
                        <List disablePadding>
                            {items.map((item, index) => (
                                <Box key={item.id}>
                                    <ListItem key={item.id} disableGutters disablePadding>
                                        <ListItemButton href={`/dashboard/item/${item.id}`}>
                                            <ListItemText primary={item.name} />
                                        </ListItemButton>
                                        {item.image && (
                                            <ListItemAvatar>
                                                <Avatar src={item.image} alt={item.name} />
                                            </ListItemAvatar>
                                        )}
                                    </ListItem>
                                    {index < items.length - 1 && <Divider />}
                                </Box>
                            ))}
                        </List>
                    </Box>
                )}
            </Stack>
        </Box>
    )
}
