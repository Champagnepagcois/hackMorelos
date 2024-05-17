"use client";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: 16, // Aquí se utilizan valores numéricos en lugar de theme.spacing
  },
  messagesContainer: {
    flexGrow: 1,
    overflowY: "auto",
    marginBottom: 16, // También aquí
  },
  message: {
    padding: 8, // Y aquí
    margin: 8, // Y aquí
    borderRadius: 4, // Y aquí
    backgroundColor: "#F2F2F2",
  },
  messageBot: {
    padding: 8, // Y aquí
    margin: 8, // Y aquí
    borderRadius: 4, // Y aquí
    backgroundColor: "#5aa9e6",
    color:"#FFF",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
  },
  textField: {
    flexGrow: 1,
    marginRight: 16, // Y aquí
  },
}));

const ChatInterface = () => {
  const classes = useStyles();
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([{message:"hola, me podrias ayudar a encontrar un médico?", user:1}]);

  const handleMessageChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleMessageSend = () => {
    if (prompt.trim() !== "") { // Cambio aquí, usando message en lugar de prompt
      const newMessage = { user: 1, message: prompt }; // Crear un nuevo mensaje con el texto
      setMessages([...messages, newMessage]); // Agregar el nuevo mensaje al array de mensajes
      setPrompt(""); // Limpiar el campo de entrada después de enviar el mensaje
    }
  };

  return (
    <Box sx={{ height: "100vh", width: "100vw" }}>
      <Paper className={classes.root}>
        <div className={classes.messagesContainer}>
          {messages.map((msg, index) => (
            <Paper key={index} className={msg.user%2==0?classes.messageBot:classes.message}>
              <Typography variant="body1">{msg.message}</Typography>
            </Paper>
          ))}
        </div>
        <div className={classes.inputContainer}>
          <TextField
            className={classes.textField}
            label="Type your message"
            variant="outlined"
            value={prompt}
            onChange={handleMessageChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleMessageSend}
          >
            Send
          </Button>
        </div>
      </Paper>
    </Box>
  );
};

export default ChatInterface;
