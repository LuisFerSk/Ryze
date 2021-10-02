const asignatura = [
  { titulo: "Asignatura 1", codigo: "MT-201", estado: true },
  { titulo: "Asignatura 2", codigo: "MT-200", estado: false },
];

export const initAsignatura = (value) => {
  return {
    codigo: value,
    titulo: value,
    estado: value,
  }
};


export default asignatura;
