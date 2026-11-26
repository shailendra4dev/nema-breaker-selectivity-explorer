import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';

import { NavLink, useLocation } from 'react-router-dom';

import {
  navigationItems,
  type NavigationSection,
} from './navigationItems';

interface AppNavigationProps {
  onNavigate?: () => void;
}

interface NavigationSectionConfig {
  id: NavigationSection;
  label?: string;
}

const navigationSections: NavigationSectionConfig[] = [
  {
    id: 'main',
  },
  {
    id: 'data-management',
    label: 'Data management',
  },
  {
    id: 'information',
  },
];

const AppNavigation = ({ onNavigate }: AppNavigationProps) => {
  const location = useLocation();

  const isPathActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  return (
    <Box
      component="nav"
      aria-label="Primary navigation"
      sx={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        bgcolor: 'background.paper',
      }}
    >
      <Toolbar
        sx={{
          alignItems: 'center',
          minHeight: 64,
          px: 2.5,
        }}
      >
        <Box>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            NEMA Selectivity
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            Explorer
          </Typography>
        </Box>
      </Toolbar>

      <Divider />

      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          py: 1,
        }}
      >
        {navigationSections.map((section, sectionIndex) => {
          const sectionItems = navigationItems.filter(
            (item) => item.section === section.id,
          );

          return (
            <Box key={section.id}>
              {sectionIndex > 0 && (
                <Divider sx={{ my: 1 }} />
              )}

              {section.label && (
                <Typography
                  variant="overline"
                  color="text.secondary"
                  sx={{
                    display: 'block',
                    px: 2.5,
                    pt: 1,
                    pb: 0.5,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                  }}
                >
                  {section.label}
                </Typography>
              )}

              <List disablePadding>
                {sectionItems.map((item) => {
                  const Icon = item.icon;
                  const selected = isPathActive(item.path);

                  return (
                    <ListItemButton
                      key={item.path}
                      component={NavLink}
                      to={item.path}
                      selected={selected}
                      onClick={onNavigate}
                      sx={{
                        mx: 1,
                        my: 0.25,
                        minHeight: 44,
                        borderRadius: 1.5,
                        color: selected
                          ? 'primary.main'
                          : 'text.primary',
                        '&.Mui-selected': {
                          bgcolor: 'action.selected',
                        },
                        '&.Mui-selected:hover': {
                          bgcolor: 'action.hover',
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 40,
                          color: selected
                            ? 'primary.main'
                            : 'text.secondary',
                        }}
                      >
                        <Icon fontSize="small" />
                      </ListItemIcon>

                      <ListItemText
                        primary={item.label}
                        slotProps={{
                          primary: {
                            sx: {
                              fontSize: '0.9rem',
                              fontWeight: selected ? 600 : 400,
                            },
                          },
                        }}
                      />
                    </ListItemButton>
                  );
                })}
              </List>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default AppNavigation;