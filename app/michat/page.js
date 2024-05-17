'use client'
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: 16, // Aquí se utilizan valores numéricos en lugar de theme.spacing
  },
  messagesContainer: {
    flexGrow: 1,
    overflowY: 'auto',
    marginBottom: 16, // También aquí
  },
  message: {
    padding: 8, // Y aquí
    margin: 8, // Y aquí
    borderRadius: 4, // Y aquí
    backgroundColor: '#F2F2F2',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  textField: {
    flexGrow: 1,
    marginRight: 16, // Y aquí
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
