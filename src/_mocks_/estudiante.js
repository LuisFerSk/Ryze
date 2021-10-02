const estudiante = [
  { cedula: "1003243681", email: "correo1@gmail.com", nombres: "Luis Fernando", apellidos: "Campo Montero", programa: "Ingienieria de sistema", estado: true },
  { cedula: "1003243682", email: "correo1@gmail.com", nombres: "Leonardo Jose", apellidos: "Rodriguez Camargo", programa: "Ingienieria de sistema", estado: false },
];

export const initEstudiante = (value) => ({ cedula: value, email: value, nombres: value, apellidos: value, programa: value, estado: value })

export default estudiante;
