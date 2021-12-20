const usuario = [
  { cedula: '1003243681', email: 'correo1@gmail.com', nombres: 'Luis Fernando', apellidos: 'Campo Montero', estado: true },
  { cedula: '1003243682', email: 'correo1@gmail.com', nombres: 'Leonardo Jose', apellidos: 'Rodriguez Camargo', estado: false },
]

export const initUsuario = (value) => ({ cedula: value, email: value, nombres: value, apellidos: value, estado: value })

export default usuario;
