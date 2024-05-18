"use client";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import GPT from "../helpers/gpt/ApiGpt";

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
    color: "#FFF",
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
  const [messages, setMessages] = useState([
    {
      message: "Hola soy cindy la mano derecha de los cardiologos, dime que síntomas tienes 👨‍⚕️",
      user: 'bot',
    },
  ]);

  const handleMessageChange = (event) => {
    setPrompt(event.target.value);
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleMessageSend();
    }
  };

  const handleMessageSend = async () => {
    console.log(messages);
    if (prompt.trim() !== "") {
      // Crear un nuevo mensaje con el texto del prompt
      const newMessage = { user: 'cliente', message: prompt };
      // Agregar el nuevo mensaje al array de mensajes
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      // Limpiar el campo de entrada después de enviar el mensaje
      setPrompt("");

      // Verificar si es el primer mensaje
      if (messages.length==0 || messages.length <1) {
        try {
          // Lanzar prompt de inicio de dignotico
          const resa = await GPT.cardiologo();
          //const resa = await GPT.PrimerMensaje(messages);
          let res = JSON.parse(resa);
          console.log(messages);
          // Crear un nuevo mensaje con la respuesta
          const newMessage2 = { user: 'bot', message: res.preguntaAlCliente };
          // Agregar el nuevo mensaje al array de mensajes
          setMessages((prevMessages) => [...prevMessages, newMessage2]);
        } catch (error) {
          console.error("Error al obtener el primer mensaje:", error);
        }
      } else {
        try {
          // Lanzar prompt de inicio de dignotico
          let resa = await GPT.intermedio(messages);
          if(resa[0] !=='{'){
            let indiceIni = resa.indexOf('{');
            let indiceFin = resa.indexOf('}');
            if(indiceIni !== -1 && indiceFin !==-1){
              resa = resa.substring(indiceIni, indiceFin+1);
            }
          }
          //let res = JSON.stringify(resa);
          let res = JSON.parse(resa);
          if (res.DiagnosticoCompleto) {
            const newMessage2 = { user: 'bot', message: res.preguntaAlCliente };
            // Agregar el nuevo mensaje al array de mensajes
            setMessages((prevMessages) => [...prevMessages, newMessage2]);     
          }
          console.log(res);
          // Crear un nuevo mensaje con la respuesta
          const newMessage2 = { user: 'bot', message: res.preguntaAlCliente };
          // Agregar el nuevo mensaje al array de mensajes
          setMessages((prevMessages) => [...prevMessages, newMessage2]);
        } catch (error) {
          console.error("Error al obtener el primer mensajeSS:", error);
        }
      }
    }
  };

  return (
    <Box sx={{ height: "100vh", width: "100vw" }}>
      <Paper className={classes.root}>
        <div className={classes.messagesContainer}>
          {messages.map((msg, index) => (
            <Paper
              key={index}
              className={
                msg.user === 'bot' ? classes.messageBot : classes.message
              }
            >
              <Typography variant="body1">{msg.message}</Typography>
            </Paper>
          ))}
        </div>
        <div className={classes.inputContainer}>
          <TextField
            className={classes.textField}
            label="Escribe tus sintomas"
            variant="outlined"
            value={prompt}
            onChange={handleMessageChange}
            onEnterPress={handleMessageSend}
            onKeyPress={handleKeyPress}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleMessageSend}
            onEnterPress={handleMessageSend}
          >
            enviar
          </Button>
        </div>
      </Paper>
    </Box>
  );
};

export default ChatInterface;