// material
import { styled } from '@mui/material/styles'
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput
} from '@mui/material'

import { MdDelete } from 'react-icons/md'
// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}))

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 320,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}))

// ----------------------------------------------------------------------

export default function AdminToolbar({
  numSelected,
  filterName,
  onFilterName
}) {
  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter'
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder="Search user..."
        />
      )}

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton>
            <MdDelete />
          </IconButton>
        </Tooltip>
      )}
    </RootStyle>
  )
}
/*  (
  <Tooltip title="Filter list">
    <IconButton>
      <MdFilterAlt />
    </IconButton>
  </Tooltip>
) */
