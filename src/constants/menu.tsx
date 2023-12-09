import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import InventoryIcon from '@mui/icons-material/Inventory';
//import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import CategoryIcon from '@mui/icons-material/Category';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
//import AttachEmailIcon from '@mui/icons-material/AttachEmail';

export const menu = [
    {
      id: 1,
      main: "Main",
      listItems: [
        {
          id: 1,
          title: "Homepage",
          url: "/homepage",
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
      ],
    },
    // {
    //   id: 4,
    //   main: "Maintenance",
    //   listItems: [
    //     {
    //       id: 1,
    //       title: "Settings",
    //       url: "/settings",
    //       icon: SettingsSuggestIcon,
    //     }
    //   ],
    // },
    // {
    //   id: 5,
    //   main: "Need Help ?",
    //   listItems: [
    //     {
    //       id: 1,
    //       title: "Contact us",
    //       url: "/contact",
    //       icon: AttachEmailIcon,
    //     }
    //   ],
    // },
  ];
  
