import { Link } from "react-router-dom";
import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import "./menu.scss"
import { menu } from "../../constants/menu";

export const Menu = () => {
  return (
    <div className="menu">
      {menu.map((item) => (
        <div className="item" key={item.id}>
          <ListItemText primary={item.main} />
          <List>
            {item.listItems.map((listItem) => (
              <Link to={listItem.url} className="listItem" key={listItem.id}>
                <ListItem>
                  <ListItemIcon>
                    {React.createElement(listItem.icon)}
                  </ListItemIcon>
                  <ListItemText primary={listItem.title} />
                </ListItem>
              </Link>
            ))}
          </List>
        </div>
      ))}
    </div>
  );
};
