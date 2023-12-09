import { Link } from "react-router-dom";
import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import "./menu.scss"
import { menu } from "../../constants/menu";
import styled from "@emotion/styled";

const CustomListItemText = styled(ListItemText)({
  marginTop: 10,
  color: 'white',
  textTransform: 'uppercase',  
});

const CustomList = styled(List)({
  marginTop: 30,
})

const CustomListItem = styled(ListItem)({
  color: 'white',
  marginBottom: 40,
})

const CustomListItemIcon = styled(ListItemIcon)({
  color: 'white',
})

export const Menu = () => {
  return (
    <div className="menu">
      {menu.map((item) => (
        <div className="item" key={item.id}>
          <CustomListItemText primary={item.main} />
          <CustomList>
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
          </CustomList>
        </div>
      ))}
    </div>
  );
};
