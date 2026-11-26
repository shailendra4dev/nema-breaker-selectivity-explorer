import type { SvgIconComponent } from '@mui/icons-material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ElectricalServicesOutlinedIcon from '@mui/icons-material/ElectricalServicesOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export type NavigationSection =
  | 'main'
  | 'data-management'
  | 'information';

export interface NavigationItem {
  label: string;
  path: string;
  icon: SvgIconComponent;
  section: NavigationSection;
}

export const navigationItems: NavigationItem[] = [
  {
    label: 'Dashboard',
    path: '/',
    icon: DashboardOutlinedIcon,
    section: 'main',
  },
  {
    label: 'Selectivity Explorer',
    path: '/explorer',
    icon: ExploreOutlinedIcon,
    section: 'main',
  },
  {
    label: 'Breaker Families',
    path: '/breaker-families',
    icon: CategoryOutlinedIcon,
    section: 'data-management',
  },
  {
    label: 'Breakers',
    path: '/breakers',
    icon: ElectricalServicesOutlinedIcon,
    section: 'data-management',
  },
  {
    label: 'Selectivity Records',
    path: '/selectivity-records',
    icon: TableChartOutlinedIcon,
    section: 'data-management',
  },
  {
    label: 'About',
    path: '/about',
    icon: InfoOutlinedIcon,
    section: 'information',
  },
];