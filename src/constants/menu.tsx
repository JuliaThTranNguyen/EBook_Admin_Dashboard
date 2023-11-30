import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import InventoryIcon from '@mui/icons-material/Inventory';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import LogoutIcon from '@mui/icons-material/Logout';
import CategoryIcon from '@mui/icons-material/Category';
import RuleIcon from '@mui/icons-material/Rule';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

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
          icon: PeopleAltIcon,
        },
        {
          id: 2,
          title: "Books",
          url: "/books",
          icon: InventoryIcon,
        },
        {
          id: 3,
          title: "Authors",
          url: "/authors",
          icon: GroupAddIcon,
        },
        {
          id: 4,
          title: "Genres",
          url: "/genres",
          icon: CategoryIcon,
        },
        {
          id: 5,
          title: "BookAuthors",
          url: "/books&authors",
          icon: ChecklistRtlIcon,
        },
        {
          id: 6,
          title: "BookGenres",
          url: "/books&genres",
          icon: RuleIcon,
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
  
