'use client'
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/material';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2),
  },
  messagesContainer: {
    flexGrow: 1,
    overflowY: 'auto',
    marginBottom: theme.spacing(2),
  },
  message: {
    padding: theme.spacing(1),
    margin: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[200],
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  textField: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
}));

const ChatInterface = () => {
  const classes = useStyles();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleMessageSend = () => {
    if (message.trim() !== '') {
      setMessages([...messages, message]);
      setMessage('');
    }
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.messagesContainer}>
        {messages.map((msg, index) => (
          <Paper key={index} className={classes.message}>
            <Typography variant="body1">{msg}</Typography>
          </Paper>
        ))}
      </div>
      <div className={classes.inputContainer}>
        <TextField
          className={classes.textField}
          label="Type your message"
          variant="outlined"
          value={message}
          onChange={handleMessageChange}
        />
        <Button variant="contained" color="primary" onClick={handleMessageSend}>
          Send
        </Button>
      </div>
    </Paper>
  );
};

export default ChatInterface;
