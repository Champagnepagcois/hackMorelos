import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function AlignItemsList() {
  // Recuperar los datos de la lista del localStorage
  const storedDataString = localStorage.getItem('Markas');
  const listaDatos = storedDataString ? JSON.parse(storedDataString) : [];

  return (
    <List sx={{ width: '100%', maxWidth: 380, bgcolor: 'background.paper', maxHeight:520, borderRadius: '10px',}}>
      {listaDatos.map((dato: { Marker: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | null | undefined; Distance: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; Monto: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, index: React.Key | null | undefined) => (
        <React.Fragment key={index}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              {/* <Avatar alt={dato.Marker} /> */}
            </ListItemAvatar>
            <ListItemText
              primary={dato.Marker}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Distancia: {dato.Distance}
                  </Typography>
                  <br />
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Monto: {dato.Monto}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          {index !== listaDatos.length - 1 && <Divider variant="inset" component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
}
