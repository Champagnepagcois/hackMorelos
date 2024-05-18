// api/chatApi.js
import OpenAI from "openai";
import Prompt from "../gpt/promps";
const openai = new OpenAI({apiKey:'sk-proj-UvTFwOq5hJzRHtm0WFrJT3BlbkFJ87Q3YFh9DmtbLvICisZE',dangerouslyAllowBrowser:true});

const GPT = {};

GPT.PrimerMensaje = async (context) => {
  const input  = Prompt.Inicial;
  
  //const input  = Prompt.Inicial + "El contexto es" + context;
    const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: input }],
    //model:"gpt-4o",
    model: "gpt-3.5-turbo",
  }); 
  return  completion.choices[0].message.content;
};
GPT.GetPadecimiento = async (context) => {
  const input  = Prompt.propuestas + "El contexto es" + context;
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: input }],
    model: "gpt-3.5-turbo",
  }); 
  return completion.choices[0].message.content;
};
 
GPT.intermedio = async (context) =>{
  console.log("ContextoAPI:\n"+context)
  //const input = "Aqui te paso el contexto de nuestra platica "+ context + "Quiero que tu respuesta respete que sea en formato JSON y eso ";
  const input = "Aqui hay algo de contexto" + context + "y recuerda"+ Prompt.Inicial;
  //const input = "Aqui te paso el contexto de nuestra platica " +context + " quiero que obtengas toda la informacion posible de un primer sintoma antes de pasar a otro sintoma y solo puedes hacer una pregunta a la vez, Quiero que tu respuesta este necesariamente en formato JSON y tenga los siguintes campos: DiagnosticoCompleto, preguntaAlCliente, esto cuando el campo DiagnosticoCompleto es falso, de lo contrario quiero que me regreses un JSON que contenga los detalles completos de los sintomas quisiera que me contestaras con los sintomas que detectaste o caracteristicas en un formato de tipo JSON";
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: input }],
   //model: "gpt-4o",
   model: "gpt-3.5-turbo",

  }); 
  return completion.choices[0].message.content;
}


GPT.GetEnfermedades = async (input) =>{
  const completion = await openai.chat.completion.create({
    messages:[{role:"system", content:input}],
    model: "gpt-3.5-turbo",
  });
  return completion.choices[0].message.content;
}

export default GPT;