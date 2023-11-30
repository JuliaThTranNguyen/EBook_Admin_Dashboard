import { Link } from "react-router-dom";
import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import "./menu.scss"
import { menu } from "../../constants/menu";
import styled from "@emotion/styled";

const CustomListItem = styled(ListItem)({
  color: 'white'
})

const CustomListItemIcon = styled(ListItemIcon)({
  color: 'white'
})

export const Menu = () => {
  return (
    <div className="menu">
      {menu.map((item) => (
        <div className="item" key={item.id}>
          <ListItemText primary={item.main} />
          <List>
            {item.listItems.map((listItem) => (
              <Link to={listItem.url} className="listItem" key={listItem.id}>
                <CustomListItem>
                  <CustomListItemIcon>
                    {React.createElement(listItem.icon)}
                  </CustomListItemIcon>
                  <ListItemText primary={listItem.title} />
                </CustomListItem>
              </Link>
            ))}
          </List>
        </div>
      ))}
    </div>
  );
};
