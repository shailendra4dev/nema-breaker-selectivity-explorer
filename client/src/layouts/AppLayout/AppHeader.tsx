import MenuIcon from '@mui/icons-material/Menu';

import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';

interface AppHeaderProps {
  drawerWidth: number;
  onMenuClick: () => void;
}

const AppHeader = ({
  drawerWidth,
  onMenuClick,
}: AppHeaderProps) => {
  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: 'divider',

        width: {
          md: `calc(100% - ${drawerWidth}px)`,
        },

        ml: {
          md: `${drawerWidth}px`,
        },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open navigation menu"
          edge="start"
          onClick={onMenuClick}
          sx={{
            mr: 2,
            display: {
              md: 'none',
            },
          }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="h6"
            component="div"
            noWrap
            sx={{
              fontWeight: 600,
            }}
          >
            NEMA Breaker Selectivity Explorer
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            noWrap
            sx={{
              display: {
                xs: 'none',
                sm: 'block',
              },
            }}
          >
            Selective coordination reference and data management
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;