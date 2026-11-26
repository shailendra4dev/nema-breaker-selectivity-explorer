import { useState } from 'react';

import {
  Box,
  Drawer,
  Toolbar,
} from '@mui/material';

import { Outlet } from 'react-router-dom';

import AppHeader from './AppHeader';
import AppNavigation from './AppNavigation';

const DRAWER_WIDTH = 264;

const AppLayout = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] =
    useState(false);

  const handleDrawerToggle = () => {
    setMobileDrawerOpen(
      (currentValue) => !currentValue,
    );
  };

  const handleDrawerClose = () => {
    setMobileDrawerOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <AppHeader
        drawerWidth={DRAWER_WIDTH}
        onMenuClick={handleDrawerToggle}
      />

      <Box
        component="aside"
        aria-label="Application sidebar"
        sx={{
          width: {
            md: DRAWER_WIDTH,
          },
          flexShrink: {
            md: 0,
          },
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileDrawerOpen}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: {
              xs: 'block',
              md: 'none',
            },
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
            },
          }}
        >
          <AppNavigation
            onNavigate={handleDrawerClose}
          />
        </Drawer>

        <Drawer
          variant="permanent"
          open
          sx={{
            display: {
              xs: 'none',
              md: 'block',
            },
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              borderRight: 1,
              borderColor: 'divider',
            },
          }}
        >
          <AppNavigation />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,

          width: {
            md: `calc(100% - ${DRAWER_WIDTH}px)`,
          },
        }}
      >
        <Toolbar />

        <Box
          sx={{
            p: {
              xs: 2,
              sm: 3,
              lg: 4,
            },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;