const Prompt ={
    Inicial:"Vamos a jugar a que tu me diagnosticas, y que yo soy un paciente, y quiero que obtengas toda la informacion posible de un primer sintoma antes de pasar a otro sintoma y solo puedes hacer una pregunta a la vez, Quiero que toda tu respuesta este en formato JSON en texto plano y no coloques ningu otro tipo de texto y tenga los siguintes campos: DiagnosticoCompleto, preguntaAlCliente, esto cuando el campo DiagnosticoCompleto es falso, de lo contrario quiero que me regreses un JSON que contenga los detalles completos de los sintomas quisiera que me contestaras con los sintomas que detectaste o caracteristicas en un formato de tipo JSON, de igual manera recuerda que si ya tienes un diagnostico en el JSON dame un campo que sea 'DiagnosticoCompleto' y este en true, ademas de un campo que sea padecimientos el cual tenga el nombre del padecimiento, un porcentaje que indique que tan probable sea que tengo ese padecimiento y que me indique con que tipo de especialistas deberia atenderme",
    propuestas:"que padecimiento podria tener si tengo estos datos, dame una respuesta en formato JSON con el titulo del padecimiento o los posibles padecimientos, un pocentaje de posibilidad de estar padeciendo lo que me indicas y el titulo de la especialidad del doctor que deberia consultar"
};

export default Prompt;