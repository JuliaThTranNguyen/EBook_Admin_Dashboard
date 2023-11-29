import React from 'react'
import "./navbar.scss"
import logo from "../../assets/logo.svg"
import SearchIcon from '@mui/icons-material/Search';
import AppsIcon from '@mui/icons-material/Apps';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box } from '@mui/material';

export const Navbar = () => {
  return (
    <Box className="navbar">
    <Box className="logo">
      <img src={logo} alt="logo" />
      <span>JuJu Inventory App</span>
    </Box>
    <Box className="icons">
        <SearchIcon className='icon'/>
        <AppsIcon className='icon'/>
        <Box className="notification">
        <NotificationsActiveIcon className='icon'/>
          <span>1</span>
        </Box>
        <Box className="user">
          <img
            src="https://scontent-hel3-1.xx.fbcdn.net/v/t39.30808-6/315433288_3275255612741093_8704386249122061518_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=UaNMknzgCDkAX9j8HMF&_nc_ht=scontent-hel3-1.xx&oh=00_AfA_5EYMtufZf0SVVnN6BKmBTDv3eFR_eaPXbTWX6fmo5Q&oe=656AF952"
            alt="julia"
          />
          <span>Julia</span>
        </Box>
        <SettingsIcon className='icon'/>
      </Box>
  </Box>
  )
}

