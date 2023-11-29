import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import LogoutIcon from '@mui/icons-material/Logout';

export const menu = [
    {
      id: 1,
      main: "Main",
      listItems: [
        {
          id: 1,
          title: "Homepage",
          url: "/",
          icon: HomeIcon,
        },
        {
          id: 2,
          title: "Profile",
          url: "/profile",
          icon: PersonIcon,
        },
      ],
    },
    {
      id: 2,
      main: "Lists",
      listItems: [
        {
          id: 1,
          title: "Users",
          url: "/users",
          icon: PersonIcon,
        },
        {
          id: 2,
          title: "Products",
          url: "/products",
          icon: InventoryIcon,
        },
        {
          id: 3,
          title: "Orders",
          url: "/orders",
          icon: ChecklistRtlIcon,
        },
      ],
    },
    {
      id: 4,
      main: "Maintenance",
      listItems: [
        {
          id: 1,
          title: "Settings",
          url: "/",
          icon: SettingsSuggestIcon,
        }
      ],
    },
    {
      id: 5,
      main: "Logout",
      listItems: [
        {
          id: 2,
          title: "Logout",
          url: "/",
          icon: LogoutIcon,
        },
      ],
    },
  ];
  